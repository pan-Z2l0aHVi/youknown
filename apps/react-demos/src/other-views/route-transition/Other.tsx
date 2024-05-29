import { Button } from '@youknown/react-ui/src'
import { useNavigate } from 'react-router-dom'

export default function OtherPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-blue min-h-[calc(100vh-48px)] p-10px">
      <Button
        onClick={() => {
          navigate('/component/route_transition/list')
        }}
      >
        Go list
      </Button>
    </div>
  )
}
