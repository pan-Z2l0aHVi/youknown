import { List } from '@youknown/react-ui/src'
import { useNavigate } from 'react-router-dom'

export default function ListPage() {
  const navigate = useNavigate()
  const list = Array(10)
    .fill(null)
    .map((_, index) => index)
  return (
    <div className="bg-orange min-h-[calc(100vh-48px)] p-10px">
      <List>
        {list.map(item => (
          <List.Item
            key={item}
            clickable
            onClick={() => {
              navigate('/component/route_transition/detail')
            }}
          >
            Item {item}
          </List.Item>
        ))}
      </List>
    </div>
  )
}
