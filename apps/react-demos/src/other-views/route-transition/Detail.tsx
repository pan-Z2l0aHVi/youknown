import { Button } from '@youknown/react-ui/src'
import { useNavigate } from 'react-router-dom'

export default function DetailPage() {
  const navigate = useNavigate()
  return (
    <div className="bg-red min-h-[calc(100vh-48px)] p-10px">
      <Button
        onClick={() => {
          navigate('/component/route_transition/other')
        }}
      >
        Go other
      </Button>
    </div>
  )
}
