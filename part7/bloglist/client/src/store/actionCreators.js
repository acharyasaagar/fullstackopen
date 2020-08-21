export const initBlogsAction = () => ({
  type: 'INIT_BLOGS',
  payload: [
    {
      title: 'Quick Intro to the Payment Request API',
      author: 'Alligator.io',
      likes: 11,
      url:
        'https://www.digitalocean.com/community/tutorials/js-payment-request-api-intro',
      user: {
        name: 'John Doe',
        username: 'john',
        id: '5f1ff16b80530924ef3effa4',
      },
      id: '5f2039a0cfa92f086108f181',
    },
  ],
})
