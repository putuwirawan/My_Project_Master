export interface BrandModel {
  id: number;
  code: string;
  deskription: string;
  url: string;
}
const Brands: BrandModel[] = [
  {
    id: 0,
    code: 'INS',
    deskription: 'INSIGHT',
    url:require('../../Assets/Images/INSIGHT.png'),
  },
  {
    id: 1,
    code: 'SPY',
    deskription: 'SPYDERBILT',
    url: require('../../Assets/Images/SPYDERBILT.png'),
  },
  {
    id: 2,
    code: 'JEC',
    deskription: 'JUICE EMATIC',
    url:require('../../Assets/Images/JUICE_EMATIC.png') ,
  },
  {
    id: 3,
    code: 'DRG',
    deskription: 'DRAGON',
    url:require( '../../Assets/Images/DRAGON.png'),
  },
  {
    id: 4,
    code: 'PSM',
    deskription: 'PLANETSURF',
    url:require('../../Assets/Images/PLANETSURF_CLOTHING.png') ,
  },
];
export default Brands