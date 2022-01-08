import React, { useEffect, useState } from 'react';
import { ReactComponent as ExitIcon } from './exit-icon.svg';
import './approve-modal.scss';
import { TokenIcon } from '../TokenIcon/token_icon';
import { Spin, Switch } from 'antd';
import { useWeb3React } from '@web3-react/core';
import ERC20ABI from '../../abi/ERC20.json';
import { MAX_INT } from '../../constants';
import { useSystemContext } from '../../systemProvider';
import { LOADER_INDICATOR_MINI } from '../../constants';

export const ApproveModal = () => {

    const {library, account} = useWeb3React();

    const {approveModal, setApproveModal, approveDataForModal} = useSystemContext();
    const [approveLoading, serApproveLoading] = useState([false, false])


    const [approveLocalState, setApproveLocalState] = useState(null);

    useEffect(() => {

        if (approveDataForModal) {
            setApproveLocalState(approveDataForModal);
        }

    }, [approveDataForModal])

    const handleApprove = async (address, name, index) => {

        serApproveLoading(prevState => {
            let arr = [...prevState];
            arr[index] = true

            return arr;
        })

        const contr = new library.eth.Contract(ERC20ABI, address);
        await contr.methods.approve(approveLocalState.destination, MAX_INT).send({from: account});

        serApproveLoading(prevState => {
            let arr = [...prevState];
            arr[index] = false
            return arr;
        })

        changeSwitchApprove(name)

    }

    const changeSwitchApprove = (name) => {

        const stateCopy = {...approveLocalState};

        const findItemInd = stateCopy.approves.findIndex((item) => item.name === name);
        const findItemCopy = {...stateCopy.approves[findItemInd]};
        
        findItemCopy.alreadyApproved = true;

        stateCopy.approves[findItemInd] = findItemCopy;

        setApproveLocalState({...stateCopy});

    }

    console.log(approveLoading);

    return (
        <>
            {approveModal && approveDataForModal ? 
                <div className='approve-modal-wrapper'> 
                    <div className='approve-modal modal-switch'> 
                        <a href="#" onClick={() => setApproveModal(false)}> <ExitIcon /> </a>
                        <h2> Before interacting with the application, you need <br/> to approve token spending in your wallet </h2>
                        <div className='approves-wrapper'>
                            {approveLocalState && approveLocalState.approves.map((item, _ind) => {

                                let name = item.lpToken ? `${item.name[0]}-${item.name[1]}` : item.name;

                                return (
                                    <div className='approve-item'>
                                        <div className='approve-item__token'>
                                            {
                                                item.lpToken ? 
                                                <>
                                                    <TokenIcon iconName={item.name[0]}/>
                                                    <TokenIcon iconName={item.name[1]}/>
                                                    <h5>{name}</h5>
                                                </>
                                                :
                                                <>
                                                    <TokenIcon iconName={name}/>
                                                    <h5>{name}</h5>
                                                </>

                                            }

                                        </div>                                        
                                        {approveLoading[_ind] ? <Spin style={{display: "grid", justifyItems: "flex-end"}} indicator={LOADER_INDICATOR_MINI}/>  : <Switch checked={item.alreadyApproved} onChange={() => !item.alreadyApproved ? handleApprove(item.address, item.name, _ind) : null}/>}
                                    
                                    </div>
                                )
                            })}
                        </div>
                        <button onClick={() => setApproveModal(false)} className='close-approve-btn'> Ok </button>
                    </div>
                </div>
                :
                null
            }
        </>
    )

}