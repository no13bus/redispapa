import styles from './style.module.less'
import {useState, FC} from "react";

interface Props {
  title: string
  content: string
}


const Main: FC<Props> = ({title, content}) => {
  // FIXME: 我这里把展示放到最下层了  如果需要只展开一个  就把数据提到上层，或者把onChange传下来供触发
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className={styles.card}>
      <div className={styles.handle} onClick={() => setShow(!show)}>
        {title}
      </div>
      <div className={`${styles.content} ${show ? styles.show : ''}`}>
        {content}
      </div>
    </div>
  )
}

export default Main

// FIXME: 别的我也不知道写点啥了。。。。