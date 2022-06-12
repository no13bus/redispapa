export const formatDate = (d: Date) => {

  
  
    const y = d.getFullYear() // 年份
  
    const m = (d.getMonth() + 1).toString().padStart(2, '0') // 月份
  
    const r = d.getDate().toString().padStart(2, '0') // 日子
  
    const hh = d.getHours().toString().padStart(2, '0') // 小时
  
    const mm = d.getMinutes().toString().padStart(2, '0') // 分钟
  
    const ss = d.getSeconds().toString().padStart(2, '0') // 秒
  
    return `${y}-${m}-${r} ${hh}:${mm}:${ss}`// es6 字符串模板
  
  }