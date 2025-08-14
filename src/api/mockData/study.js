export default{
    // 生成作业数据的方法
  studyTasks:()=>{
    const subjects = ['高等数学', '离散数学', '数据结构', '大学英语', '大学物理', '计算机网络'];
    const tasks = [];
    
    // 生成27条作业数据（3页，每页9条）
    for (let i = 1; i <= 27; i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const status = i % 7 === 0 ? '待提交' : '已提交';
      
      // 生成日期
      const today = new Date();
      const daysOffset = status === '待提交' 
        ? Math.floor(Math.random() * 10) + 1 
        : -Math.floor(Math.random() * 20) - 1;
        
      today.setDate(today.getDate() + daysOffset);
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 23:59`;
      
      tasks.push({
        id: i,
        title: `${subject}${i % 3 === 0 ? '实验' : '作业'}${i > 3 ? i : ''}`,
        status,
        deadline: formattedDate
      });
    }
    
    return {
        code:200,
        data:tasks
    };
  }
}