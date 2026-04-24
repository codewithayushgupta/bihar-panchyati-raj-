import complaintsData from '~/data/complaints.json'
export default defineEventHandler((event) => {
  const q = getQuery(event)
  let data = [...complaintsData]
  if (q.status) data = data.filter(c => c.status === q.status)
  if (q.district) data = data.filter(c => c.district === q.district)
  if (q.priority) data = data.filter(c => c.priority === q.priority)
  if (q.token) data = data.filter(c => c.token === q.token)
  const page = parseInt(q.page as string) || 1
  const limit = parseInt(q.limit as string) || 50
  const start = (page - 1) * limit
  return { data: data.slice(start, start + limit), total: data.length, page, limit }
})
