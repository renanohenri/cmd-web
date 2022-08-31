import React from "react";
import styled from "styled-components";

const LinkPag = styled.a`
    background-color: ${props => props.number === props.current ? '#0E6DFB' : '#fff'};
    color: ${props => props.number === props.current ? '#fff' : '#454A67'};
    cursor: pointer;
`

const Pagination = ({ userPerPage, totalUser, paginate, current }) => {

    const pageNumbers = [];

    

    for (let i=1; i <= Math.ceil(totalUser / userPerPage); i++ ){
        pageNumbers.push(i);
    }   

    return (
        <div className="d-flex justify-content-between">
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                    // <PageLi key={number} number={number} current={current}>
                    //     <a onClick={() => paginate(number)} className='page-link '>
                    //     {number}
                    //     </a>
                    // </PageLi>
                    <li key={number} className='page-item'>
                        <LinkPag onClick={() => paginate(number)} className='page-link'  number={number} current={current}>
                            {number}
                        </LinkPag>
                    </li>
                    ))}
                </ul>
            </nav>
            
        </div>
        
    );
}

export default Pagination;