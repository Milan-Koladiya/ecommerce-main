
import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemButton,
    Button,
    Checkbox,
    Input
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useCategory from '../hooks/useCategory';
import useSubcategory from '../hooks/useSubcategory';
import useProduct from '../hooks/useProduct';

const ProductSidebar = ({ onFilter }) => {
    const { viewCategory } = useCategory();
    const { viewSubcategory } = useSubcategory();
    const { viewProduct } = useProduct();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

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
        setSubcategories(res.payload.data || []);
    };


    const getSubcategories = (categoryId) =>
        subcategories.filter((sub) => sub.category_id === categoryId);

    return (
        <div style={{ width: '250px',height:'400px', padding: '15px' }}>
            {categories.map((cat) => (
                <Accordion key={cat.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                            onClick={() => onFilter({ category_id: cat.id })}
                            style={{ cursor: 'pointer' }}
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

            <Button variant="outlined" fullWidth onClick={() => onFilter({})}>
                Clear Filter
            </Button>

        </div>
    );
};

export default ProductSidebar;
