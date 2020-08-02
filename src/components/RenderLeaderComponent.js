import React from 'react';
import { Media } from 'reactstrap';
import { baseUrl } from './../shared/baseUrl';

const RenderLeader = ({leader}) => {
    return (
        <div key={leader.id} className='row align-items-center'>
            < div className="col col-sm col-md">
            <Media className='mt-4'>
                    <Media left top>
                        <Media object src={baseUrl + leader.image} alt={leader.name} />
                    </Media>
                    <Media body className='ml-4'>
                        <Media heading>{leader.name}</Media >
                        <h5>{leader.designation}</h5>
                        <p class="d-none d-md-block">{leader.description}</p>
                    </Media>
            </Media>
            </div>
        </div>
    )
}

export default RenderLeader;