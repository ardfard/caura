const functions = require('@google-cloud/functions-framework')
const axios = require('axios')
const querystring = require('querystring')

async function scrapeToped(term) {
    var resp =  await axios.post('https://gql.tokopedia.com/graphql/SearchProductQueryV4',
        [{
            "operationName": "SearchProductQueryV4",
            "query": `query SearchProductQueryV4($params: String!) {
  ace_search_product_v4(params: $params) {
    data {
      products {
        id
        name
        countReview
        discountPercentage
        imageUrl
        originalPrice
        price
        priceRange
        rating
        ratingAverage
        shop {
          shopId: id
          name
          url
          city
          isOfficial
          isPowerBadge
        }
        url
      }
    }
  }
}
`,
            "variables": {
                "params": `device=desktop&navsource=&ob=3&page=1&q=${querystring.escape(term)}&related=true&rows=61&safe_search=false&scheme=https&shipping=&source=search&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&st=product&start=0&topads_bucket=true&unique_id=54b8062b568c7468f6a6eddcfe97eb82&user_addressId=&user_cityId=176&user_districtId=2274&user_id=&user_lat=&user_long=&user_postCode=&user_warehouseId=0&variants=&warehouses=&shop_tier=2%233%231`
            }
        }]

        , {
            headers: {
                "X-Version": "e964dcc",
                "Content-Type": "application/json",
                "x-device": "desktop-0.0",
                'Tkpd-UserId': 0,
                'X-Source': 'tokopedia-lite',
                'Origin': 'https://www.tokopedia.com',
                'Connection': "keep-alive",
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'TE': 'trailers',
            }
        })
    
    const products = resp.data[0].data.ace_search_product_v4.data.products
    if (products != undefined) {
        console.log(products[0])

    }
}

functions.cloudEvent("Scrape", _ => {
    console.log("Executed!")
})

scrapeToped("RTX 4080")