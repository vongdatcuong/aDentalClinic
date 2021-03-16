import React from 'react';

const Tooth = function (props) {
    
    function pickTooth(e) {
        console.log(e.target.id);
        props.callback(e.target.id);
    }

    return (
        <React.Fragment>
            {props.tag==="polygon" ? 
                (<polygon onClick={(e) => pickTooth(e)} tag={props.tag} className={props.className} id={props.id} fill={props.fill} data-key={props.dataKey} points={props.points} />)
                :
                (<path onClick={(e) => pickTooth(e)} tag={props.tag} className={props.className} id={props.id} fill={props.fill} data-key={props.dataKey} d={props.d} />)
            }
        </React.Fragment>
    );
};

export default Tooth;
