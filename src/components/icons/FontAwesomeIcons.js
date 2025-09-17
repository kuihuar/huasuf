import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 导入常用的solid图标
import { 
  faHome, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faSearch,
  faBars,
  faTimes,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faStar,
  faHeart,
  faShoppingCart,
  faUserCircle,
  faCog,
  faSignOutAlt,
  faEdit,
  faTrash,
  faPlus,
  faMinus,
  faCheck,
  faExclamationTriangle,
  faInfoCircle,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons'

// 导入常用的regular图标
import { 
  faUser as faUserRegular,
  faHeart as faHeartRegular,
  faStar as faStarRegular,
  faEnvelope as faEnvelopeRegular,
  faFileAlt,
  faCalendarAlt,
  faClock,
  faComments,
  faBookmark,
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-regular-svg-icons'

// 导入常用的brands图标
import { 
  faWeixin,
  faQq,
  faWeibo,
  faGithub,
  faLinkedin,
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'

// 将图标添加到库中
library.add(
  // Solid icons
  faHome, faUser, faEnvelope, faPhone, faMapMarkerAlt,
  faSearch, faBars, faTimes, faChevronDown, faChevronUp,
  faChevronLeft, faChevronRight, faStar, faHeart, faShoppingCart,
  faUserCircle, faCog, faSignOutAlt, faEdit, faTrash,
  faPlus, faMinus, faCheck, faExclamationTriangle, faInfoCircle, faQuestionCircle,
  
  // Regular icons
  faUserRegular, faHeartRegular, faStarRegular, faEnvelopeRegular,
  faFileAlt, faCalendarAlt, faClock, faComments, faBookmark,
  faThumbsUp, faThumbsDown,
  
  // Brand icons
  faWeixin, faQq, faWeibo, faGithub, faLinkedin, faTwitter, faFacebook, faInstagram, faYoutube
)

export { FontAwesomeIcon }
