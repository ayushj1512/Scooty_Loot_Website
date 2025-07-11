// export default defineEventHandler(async () => {
//   const config = useRuntimeConfig()

//   const baseUrl = config.public.typesenseBaseUrl
//   const apiKey = config.public.typesenseApiKey

//   const queryParams = new URLSearchParams({
//     q: '*',
//     filter_by: 'categories:=893',
//     sort_by: 'date_updated_unix:desc',
//     per_page: '50',
//     page: '1',
//     'x-typesense-api-key': apiKey
//   })

//   const url = `${baseUrl}?${queryParams}`

//   const res = await fetch(url)
//   const json = await res.json()

//   return json.hits.map((h: any) => {
//     const doc = h.document || h
//     const raw = doc.product_data ? JSON.parse(doc.product_data) : null
//     const img = raw?.images?.[0]?.bigImg?.replace(/\\/g, '/') || doc.img

//     return {
//       id: doc.id,
//       name: doc.name,
//       description: doc.description_short || 'This is a delicious bestselling product!',
//       price: doc.selling_price || doc.real_selling_price || 0,
//       image: img,
//       product_data: doc.product_data,
//     }
//   })
// })
