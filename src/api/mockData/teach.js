export default{
    getTeachTable:()=>{
        return {
            code:200,
            data:[
                {
                    data: '周一上',
                    className: '数据库原理',
                    classroomName: '综合楼213',
                    lesson: '1-3',
                    classTime:17,
                    class: '22计1',
                },
                {
                    data: '周一上',
                    className: '数据库原理',
                    classroomName: '综合楼213',
                    lesson: '4-5',
                    classTime:17,
                    class: '22计2'
                },
                {
                    data: '周二上',
                    className: '数据库原理',
                    classroomName: '综合楼105',
                    lesson: '1-3',
                    classTime:17,
                    class: '22计2',
                    ps:'教室换到综合楼202'
                },
                {
                    data: '周三下',
                    className: '数据库原理',
                    classroomName: '综合楼401',
                    lesson: '6-8',
                    classTime:17,
                    class: '22计3',
                    ps:'因设备问题缺一节课'
                },
                {
                    data: '周四上',
                    className: '数据库原理',
                    classroomName: '主楼208',
                    lesson: '1-2',
                    classTime:17,
                    class: '22计1'
                },
                {
                    data: '周五上',
                    className: '数据库原理',
                    classroomName: '主楼503',
                    lesson: '4-5',
                    classTime:16,
                    class: '22计3'
                }
            ]
        }
    },
    getTeachBar:()=>{
        return {
            code: 200,
            data:{
                dimensions: ['work', '已交', '未交',],
                source: [
                { work: '22计1', '已交': 23, '未交': 5 },
                { work: '22计2', '已交': 20, '未交': 9 },
                { work: '22计3', '已交': 26, '未交': 2 },
                ]
            }
        }
    }
}