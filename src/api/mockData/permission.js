import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    //menuList用于后面做权限分配，也就是用户可以展示的菜单
    if (username === 'teacher' && password === 'teacher') {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'Home'
            },
            {
              path: '/student',
              name: 'student',
              label: '学生管理',
              icon: 'user',
              url: 'Student'
            },
            {
              path: '/teach',
              name: 'teach',
              label: '教学管理',
              icon: 'check',
              url: 'Teach'
            },
            // {
            //   path: 'other',
            //   label: '其他',
            //   icon: 'location',
            //   children: [
            //     {
            //       path: '/page1',
            //       name: 'page1',
            //       label: '页面1',
            //       icon: 'setting',
            //       url: 'Page1'
            //     }
            //   ]
            // }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'student' && password === 'student') {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'Home'
            },
            {
                path: '/score',
                name: 'score',
                label: '成绩管理',
                icon: 'Reading',
                url: 'Score'
            },
            {
                path: '/study',
                name: 'study',
                label: '学习任务',
                icon: 'list',
                url: 'Study'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
        
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
        
    }

  }
}