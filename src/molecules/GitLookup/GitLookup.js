import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import MaterialTable from 'material-table';
import GitServices from '../../services/gitServices'
import { Block, Row, Col } from 'jsxstyle';

import './GitLookup.scss';

/**
* Component for listing the GitHub repositories of one user
*/
function GitLookup(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState(null);
    
    function parseTableData(repositories) {
        return repositories.map( ({language, default_branch, html_url, name, description }) => (
            { language, default_branch, html_url, name, description }
        ))
    }

    function handleFilterChange(e) {
        if(e.target.value.length >= 3) {
            const filteredTableData = tableData.filter( (repo) => repo.name.toLowerCase().indexOf(e.target.value) > -1 ).slice(0,5);
            setFilteredTableData(filteredTableData)
        } else {
            setFilteredTableData(null)
        }
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        GitServices.getRepositories(searchTerm).then(repositories => {
            setTableData(parseTableData(repositories));
        }, () => {
            setTableData([]);
        })
    }

    /**
    * Returns a Boolean to determine if table pagination should be displayed
    * @param  {Array} tableData Array of table row
    * @param  {Array} filteredTableData Array of filtered table rows
    * @return {Boolean}  Returns true if there are more than 5 table rows
    */
    function displayPagination(tableData, filteredTableData) {
        if(filteredTableData) {
            return filteredTableData.length > 5
        }
        return tableData.length > 5
    }

    return (
        <>
            <h1>Git Lookup</h1>
            <Row justify='center' paddingBottom="2rem">
                <Block width="100%">
                    <form onSubmit={handleSubmit} className='searchForm'>
                        <TextField 
                            name='searchTerm' 
                            label='Search Github Username' 
                            variant='outlined' 
                            fullWidth
                            onChange={e => setSearchTerm(e.target.value)}
                            className='searchForm__textField'/>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            type='submit'
                            className='searchForm__button compact'
                        >
                            Search
                        </Button>
                    </form>
                </Block>
            </Row>
            <Row justify='center' >
                <Row item xs={12} lg={10}>
                    <div className='filter__container'>
                        <TextField 
                            name='filter' 
                            label='Filter'
                            onChange={handleFilterChange}
                            className='filter__container--input'
                            color = "secondary"
                        />
                    </div>
                    <MaterialTable
                        title='User Repositories'
                        columns={[
                            { title: 'Language', field: 'language' },
                            { title: 'Default Branch', field: 'default_branch' },
                            { title: 'URL', field: 'html_url' },
                            { title: 'Name', field: 'name' },
                            { title: 'Description', field: 'description', cellStyle: { width: 90, maxWidth: 90 } }
                        ]}
                        data={filteredTableData || tableData}
                        options={{
                            search: false,
                            paging: displayPagination(tableData, filteredTableData),
                            
                        }}
                    />
                </Row>
            </Row>
        </>
    );

}

export default GitLookup;