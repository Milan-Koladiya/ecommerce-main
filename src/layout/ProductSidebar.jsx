
// import React, { useEffect, useState } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemButton, Button, Checkbox, Input } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import useCategory from '../hooks/useCategory';
// import useSubcategory from '../hooks/useSubcategory';
// import useProduct from '../hooks/useProduct';
// import SearchIcon from '@mui/icons-material/Search';

// const ProductSidebar = ({ onFilter }) => {
//     const { viewCategory } = useCategory();
//     const { viewSubcategory } = useSubcategory();
//     const { viewProduct } = useProduct();
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);

//     useEffect(() => {
//         fetchCategory();
//         fetchSubcategory();
//     }, []);

//     const fetchCategory = async () => {
//         const res = await viewCategory();
//         setCategories(res.payload?.data || []);
//     };

//     const fetchSubcategory = async () => {
//         const res = await viewSubcategory();
//         setSubcategories(res.payload.data || []);
//     };


//     const getSubcategories = (categoryId) =>
//         subcategories.filter((sub) => sub.category_id === categoryId);

//     return (
//         <div style={{ width: '250px',height:'400px', padding: '15px' }}>

//             <Button>
//                 <SearchIcon/><Input placeholder='Search....'/>
//             </Button>

//             {categories.map((cat) => (
//                 <Accordion key={cat.id}>
//                     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                         <Typography onClick={() => onFilter({ category_id: cat.id })} style={{ cursor: 'pointer' }}>
//                             {cat.name}
//                         </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
//                         <List>
//                             {getSubcategories(cat.id).map((sub) => (
//                                 <ListItem disablePadding key={sub.id}>
//                                     <ListItemButton onClick={() => onFilter({ subcategory_id: sub.id })}>
//                                         <Typography>{sub.name}</Typography>
//                                     </ListItemButton>
//                                 </ListItem>
//                             ))}
//                         </List>
//                     </AccordionDetails>
//                 </Accordion>
//             ))}

//             <Button variant="outlined" fullWidth onClick={() => onFilter({})}>
//                 Clear Filter
//             </Button>

//         </div>
//     );
// };

// export default ProductSidebar;


import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
  List, ListItem, ListItemButton, Button, InputBase, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import useCategory from '../hooks/useCategory';
import useSubcategory from '../hooks/useSubcategory';

const ProductSidebar = ({ onFilter }) => {
  const { viewCategory } = useCategory();
  const { viewSubcategory } = useSubcategory();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategory();
    fetchSubcategory();
  }, []);

  const fetchCategory = async () => {
    const res = await viewCategory();
    setCategories(res.payload?.data || []);
  };

  const fetchSubcategory = async () => {
    const res = await viewSubcategory();
    setSubcategories(res.payload?.data || []);
  };

  const getSubcategories = (categoryId) =>
    subcategories.filter((sub) => sub.category_id === categoryId);

  const handleSearch = (e) => {
    const value = e.target.value;
    console.log(value)
    setSearchTerm(value);
    onFilter({ search: value });
  };

  return (
    <div style={{ width: '250px', height: '100%', padding: '15px' }}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          border: '1px solid #ccc',
        }}
      >
        <SearchIcon sx={{ ml: 1 }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Paper>

      {categories.map((cat) => (
        <Accordion key={cat.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              onClick={() => onFilter({ category_id: cat.id })}
              sx={{ cursor: 'pointer' }}
            >
              {cat.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {getSubcategories(cat.id).map((sub) => (
                <ListItem disablePadding key={sub.id}>
                  <ListItemButton onClick={() => onFilter({ subcategory_id: sub.id })}>
                    <Typography>{sub.name}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <Button variant="outlined" fullWidth onClick={() => {
        setSearchTerm('');
        onFilter({});
      }}>
        Clear Filter
      </Button>
    </div>
  );
};

export default ProductSidebar;
