// 当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'http://127.0.0.1:4523/m1/6843731-6557943-default/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'http://127.0.0.1:4523/m1/6843731-6557943-default/api',
  },
  pro: {
    baseApi: '//future.com/api',
    mockApi: 'http://127.0.0.1:4523/m1/6843731-6557943-default/api',
  },
}

export default {
  env,
  mock:false,
  ...EnvConfig[env]
}