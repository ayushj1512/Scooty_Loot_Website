// server/api/submit-order.js
export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    return {
      success: false,
      error: 'Only POST method is allowed.'
    }
  }

  try {
    const body = await readBody(event)

    const response = await $fetch('https://gateway.streetstylestore.com/admin2014/custom-api/funky_panda/index.php', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return {
      success: true,
      data: response
    }
  } catch (error) {
    console.error('API Proxy Error:', error)
    return {
      success: false,
      error: 'Failed to submit order',
      details: error?.message || error
    }
  }
})
