/**
 * 项目默认配置项
 * title - 左上角标题
 * logo - 左上角标志网址
 * loading - 加载状态
 * layout - 整体布局方式 ['side', 'top','mix'] 两种布局
 * contentWidth -  布局的内容模式，Fluid：自适应，| Fixed：固定宽度1200px
 * theme - 导航菜单主题  'light' | 'dark'
 * navTheme - 导航栏主题  'light' |'dark'
 *
 *
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * headerHeight - 顶部高度
 * primaryColor - 默认主题色 [
 *   '#F5222D','#FA541C','#FAAD14','#13C2C2','#52C41A','#2F54EB','#722ED1','#F5222D','#FA541C','#FAAD14','#13C2C2'
 *    '#52C41A','#2F54EB','#722ED1'
 * ]
 * multiTab - 多标签模式
 *
 * siderWidth - 左侧菜单栏宽度
 *
 *
 */

export const ACCESS_TOKEN = 'Access-Token';
export const USER_INFO = 'User-Info';
export const HEADER_ACCESS_TOKEN = 'token';

export default {
  title : '管理后台',
  logo : 'https://alicdn.antdv.com/v2/assets/logo.1ef800a8.svg',
  loading : false,
  layout : 'side',
  contentWidth : 'Fluid',
  theme : 'light',
  navTheme : 'light',

  fixedHeader : true,
  fixSiderbar : true,
  headerHeight : 40,
  // primaryColor : '#F5222D',
  multiTab : true,
  siderWidth : 208,
  production : process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',

}
