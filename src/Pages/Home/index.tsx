import React, { useEffect, useState } from 'react';
import axios from 'axios';

    interface Category {
    id: string;
    name: string;
    status: string;
    }

    const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(
            'https://mock-api.arikmpt.com/api/category?page=1&name=mock%20category',
            {
                headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjNzFlNjY5LTM4ZGYtNGRkNy04NDYwLTc4ODc2ZmM0NTNjOSIsImlhdCI6MTY4NjY3MzQzOSwiZXhwIjoxNjg2Njk1MDM5fQ.IKZrgbPGEYULE_G7E8vopOMDmnCLxZaFKuArnXkcL6U',
                },
            }
            );
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    return (
        <div className="container mt-5">
        {loading ? (
            <p>Loading...</p>
        ) : (
            <table className="table">
            <thead className="thead-dark">
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    };

export default CategoryList;
