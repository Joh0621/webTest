/**
 * 下载模板
 * @param url  下载模板接口
 */
export function downLoad(url) {
  let point = ''
  if (process.env.NODE_ENV === 'development') {
    point = "http://58.18.173.195:8082/oilgas-background/" + url     // window.location.origin + '/api'
  } else {
    point = "http://58.18.173.195:8082/oilgas-background/" + url  //window.location.origin + http://192.168.31.91:8080
  }
  return point
}

export function upLoad() {

}
