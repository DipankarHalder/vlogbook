import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create, getCategories, singleCategory, removeCategory } from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        categories: [],
        error: false,
        success: false,
        removed: false,
        reload: false
    });

    const {name, categories, error, success, removed, reload } = values;
    const token = getCookie('token');

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setValues({...values, categories: data})
            }
        })
    };

    const showCategories = () => {
        return categories.map((c, i) => {
            return (
                <button onDoubleClick={() => deleteConfirm(c.slug)} title="Double click to Delete" key={i} style={{marginRight:'10px'}}>
                    {c.name}
                </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete the category?');
        if(answer){
            deleteCategory(slug);
        }
    };

    const deleteCategory = slug => {
        removeCategory(slug, token).then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload});
            }
        })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        create({ name }, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            } else {
                setValues({...values, error: false, success: true, name: '', removed: !removed, reload: !reload});
            }
        })
    };

    const handleChange = (e) => {
        setValues({...values, name: e.target.value, error: false, success: false, removed: ''});
    };

    const newCategoryFrom = () => (
        <form onSubmit={clickSubmit}>
            <div>
                <span>Name</span>
                <input type="text" className="a" onChange={handleChange} value={name} requied="true" />
            </div>
            <div>
                <button type="submit" className="btn">Create</button>
            </div>
        </form>
    );
    
    return (
        <React.Fragment>
            {newCategoryFrom()}
            <div>
                {showCategories()}
            </div>
        </React.Fragment>
    );
};

export default Category;