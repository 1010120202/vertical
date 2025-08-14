import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

// 计算年龄
function getAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}


let List = [];
const count = 200;
// 获取当前日期的时间戳
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

// 计算最小出生年份，确保年龄至少18岁
// 如果当前日期还没到今年的生日月日，那么需要减19年才能确保满18岁
let minYear;
if (currentMonth < 8 || (currentMonth === 8 && currentDay < 1)) {
    // 假设现在是8月1日前，需要至少19年前出生
    minYear = currentYear - 18;
} else {
    // 8月1日及之后，18年前出生即可满18岁
    minYear = currentYear - 18;
}

// 最大出生年份为24年前（保持原逻辑）
const maxYear = currentYear - 24;

for (let i = 0; i < count; i++) {
    // 随机生成年份，范围是 minYear 到 maxYear（确保年龄18-30岁）
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
    // 随机生成月份，范围是 1 到 12
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    // 计算当月的最大天数
    const maxDay = new Date(randomYear, randomMonth, 0).getDate();
    // 随机生成日期，范围是 1 到 maxDay
    const randomDay = Math.floor(Math.random() * maxDay) + 1;
    // 格式化日期为 "YYYY-MM-DD" 格式
    const formattedDate = `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}`;
    // 计算年龄
    const birthDate = new Date(randomYear, randomMonth - 1, randomDay);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    // 调整年龄（如果生日还没到）
    if (currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    List.push({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        age: age,
        birth: formattedDate,
        sex: Mock.Random.integer(0, 1)
    });
}



export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getStudentList: config => {
      					  //limit默认是10，因为分页器默认也是一页10个
    const { name, page = 1, limit = 10 } = param2Obj(config.url)
   
    const mockList = List.filter(student => {
        //如果name存在会，根据name筛选数据
      if (name && student.name.indexOf(name) === -1) return false
      return true
    })
     //分页
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        list: pageList,
        count: List.length, //数据总条数需要返回
      }
    }
  },
   /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteStudent: config => {
    const { id } = param2Obj(config.url)

    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
  /**
   * 增加学生
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createStudent: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
 * 修改
 * @param id, name, addr, age, birth, sex
 * @return {{code: number, data: {message: string}}}
 */
editStudent: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
    const sex_num = parseInt(sex);

    // 检查年龄与生日日期是否相符
    const calculatedAge = getAge(birth);
    if (calculatedAge !== parseInt(age)) {
        return {
            code: 400,
            data: {
                message: '年龄与生日不符'
            }
        };
    }

    // 更新学生信息
    List.some(u => {
        if (u.id === id) {
            u.name = name;
            u.addr = addr;
            u.age = age;
            u.birth = birth;
            u.sex = sex_num;
            return true;
        }
    });

    return {
        code: 200,
        data: {
            message: '编辑成功'
        }
    };
}
}