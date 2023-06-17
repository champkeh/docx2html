// @ts-ignore
import qiniu from 'npm:qiniu'

const ak = Deno.env.get('QINIU.AK')
const sk = Deno.env.get('QINIU.SK')

const mac = new qiniu.auth.digest.Mac(ak, sk)

const putPolicy = new qiniu.rs.PutPolicy({ scope: 'docx2html', expires: 7200 })
const token = putPolicy.uploadToken(mac)

console.log(token)
