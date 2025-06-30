
import React, { EventHandler, useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
  List, ListItem, ListItemButton, Button, InputBase, Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import useCategory from '../hooks/useCategory';
import useSubcategory from '../hooks/useSubcategory';
import type { ICategory } from '../types/category.type';
import type { ISubcategory } from '../types/subcategory.type';

interface ProductSideBarProps {
  onFilter: any
}
const ProductSidebar: React.FC<ProductSideBarProps> = ({ onFilter }) => {
  const { viewCategory } = useCategory();
  const { viewSubcategory } = useSubcategory();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategory();
    fetchSubcategory();
  }, []);

  const fetchCategory = async () => {
    const res: any = await viewCategory();
    setCategories(res.payload?.data);
  };

  const fetchSubcategory = async () => {
    const res: any = await viewSubcategory();
    setSubcategories(res.payload?.data);
  };

  const getSubcategories = (categoryId: string) =>
    subcategories.filter((sub) => sub.category_id === categoryId);

  const handleSearch = (e: any) => {
    const value = e.target.value;
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
            <Typography onClick={() => onFilter({ category_id: cat.id })} sx={{ cursor: 'pointer' }}>
              {cat.name.charAt(0).toUpperCase()+cat.name.slice(1)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {getSubcategories(cat.id).map((sub) => (
                <ListItem disablePadding key={sub.id}>
                  <ListItemButton onClick={() => onFilter({ subcategory_id: sub.id })}>
                    <Typography>{sub.name.charAt(0).toUpperCase() + sub.name.slice(1)} </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <Button style={{ marginTop: '10px' }} variant="outlined" fullWidth onClick={() => {
        setSearchTerm('');
        onFilter({});
      }}>
        Clear Filter
      </Button>
    </div>
  );
};

export default ProductSidebar;
