const Footer =()=>{
    const date = new Date()
    return <>
        <div className="footer">
            <p>Copyright goes to Waliul Hasan. {date.getFullYear()}</p>
        </div>
    </>
}

export default Footer