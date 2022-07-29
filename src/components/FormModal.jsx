import React from "react";
import styles from "../styles/FormModal.module.css"
export default function Modal({children, isOpen,setIsOpen}){
    function handleClick(e){
        e.stopPropagation()
    }

    function handleClose(e){
        e.preventDefault()
        setIsOpen(false)
    }

    return(
        <div className={`${styles.modal} ${isOpen && styles.show}`} onClick={()=> setIsOpen(state =>!state)}>
            <div className={styles.basicmodal} onClick={handleClick}>
                <div>
                <button type='button' onClick={handleClose} className={styles.modalButton}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}