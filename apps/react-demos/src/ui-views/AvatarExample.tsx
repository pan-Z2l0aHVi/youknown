import { Avatar, Divider, Space } from '@youknown/react-ui/src'
import { TbUser } from 'react-icons/tb'

export default () => {
  const picSrc = 'https://iph.href.lu/200x200'
  const items = [
    {
      name: 11,
      src: picSrc
    },
    {
      name: 22,
      src: picSrc
    },
    {
      name: 33,
      src: picSrc
    },
    {
      name: 44,
      src: picSrc
    },
    {
      name: 55,
      src: picSrc
    },
    {
      name: 66,
      src: picSrc
    }
  ]
  return (
    <div>
      <h1>Avatar</h1>
      <Divider />
      <Space size="large">
        <Avatar round size="small" src={picSrc} />
        <Avatar round size="medium" src={picSrc} />
        <Avatar round size="large" src={picSrc} />
      </Space>
      <Divider />
      <Space size="large">
        <Avatar size="small" src={picSrc} />
        <Avatar size="medium" src={picSrc} />
        <Avatar size="large" src={picSrc} />
      </Space>
      <Divider />
      <Avatar src={picSrc}>
        <TbUser size="20px" />
      </Avatar>
      <Divider />
      <Avatar src={picSrc}>Text</Avatar>
      <Divider />
      <Avatar badge="99+" src={picSrc} />
      <Divider />
      <Avatar.Group
        round
        max={4}
        items={items}
        renderAvatar={({ src }) => <Avatar src={src} />}
        renderRest={restItems => (
          <div className="relative flex items-center justify-center w-40px h-40px rd-full bg-#999 color-#fff b-2 b-solid b-#fff">
            +{restItems.length}
          </div>
        )}
      />
    </div>
  )
}
