export interface CategoryModel {
    id: string;
    code?: string;
    deskription?: string;
    url?: string;
    empty?:boolean
  }
  const Categories: CategoryModel[] = [
    {
      id: '0',
      code: 'TSS',
      deskription: 'T-SHIRT',
      url:require('../../Assets/Images/T-Shirt.png'),
    },
    {
      id: '1',
      code: 'SHIRT',
      deskription: 'SHIRT',
      url:require('../../Assets/Images/Shirt.png'),
    },
    {
      id: '2',
      code: 'SGL',
      deskription: 'SUNGLASSES',
      url:require('../../Assets/Images/sunglasses.jpg'),
    },
    {
      id: '3',
      code: 'UDW',
      deskription: 'UNDERWARE',
      url:require('../../Assets/Images/underware.png'),
    },
    {
      id: '4',
      code: 'DRS',
      deskription: 'DRESS',
      url:require('../../Assets/Images/dress.png'),
    },
    {
        id: '5',
        code: 'BGP',
        deskription: 'BAGPACK',
        url:require('../../Assets/Images/bagpack.png'),
      },
      {
        id:'6',
        code: 'CAP',
        deskription: 'CAP',
        url:require('../../Assets/Images/cap.png'),
      },
  ];
  export default Categories