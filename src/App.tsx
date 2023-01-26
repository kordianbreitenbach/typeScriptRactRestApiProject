
import React from 'react';
import './App.css';

const { useState, useEffect } = React;

const Modal = ({ onRequestClose,productId,posts }: any) => {

	useEffect(() => {
		function onKeyDown(event: any) {
			if (event.keyCode === 27) {
				
				onRequestClose();
			}
		}

		document.body.style.overflow = "hidden";
		document.addEventListener("keydown", onKeyDown);

	
		return () => {
			document.body.style.overflow = "visible";
			document.removeEventListener("keydown", onKeyDown);
		};
	});
const filtered=posts.filter((filter:any) => {
    return filter.id == productId;
  });
	return (
		<div className="modal__backdrop">
		<div className="modal__container">
				<button type="button" onClick={onRequestClose}>
					Close this modal
				</button>
    {filtered.map((filter:any) => {
        return (
          <div key={filter.id}>
            <h2>id: {filter.id}</h2>
            <h2>name: {filter.name}</h2>
            <h2>year: {filter.year}</h2>
             <h2>color: {filter.color}</h2>
            <h2>pantone_value: {filter.pantone_value}</h2>
            <hr />
          </div>
        );
      })}
      </div>
		</div>
	);
};

const App=()=>{ 
      const [productId,setProductId]=React.useState();
    	const [isModalOpen, setModalIsOpen] = React.useState(false);
     const [posts, setPosts] = React.useState<any>([]);
     const [page,setPage]=React.useState(1);
     const [numPages,setNumPages]=React.useState(5);
     const [number,setNumber]=React.useState<any>();
     const [error,setError]=React.useState(false);
   const handleChange = (event: any) => {
     
    setNumber(event.target.value);

  };
 const check=()=>{
     if(number>0){
        setNumPages(1);
       setPage(number);
      
     }
    if(number<=0&&numPages==1){  setNumPages(5);
       setPage(1);}
 }
     React.useEffect(() => {
    check()
    
     
        const ULR=` https://reqres.in/api/products?per_page=${numPages}&page=${page}`;
      fetch(ULR)
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data.data);
         })
         .catch((err) => {
            console.log(err.message);
        setError(true);
         });
       
   }, [page,numPages,number]);
  
  const toggleModal = () => {
		setModalIsOpen(!isModalOpen);
	};
   return(
   <div className="application">
      	{isModalOpen && <Modal onRequestClose={toggleModal} posts={posts} productId={productId}  />}
      <p className="input"> <input  
        onChange={handleChange}
        autoComplete="off"
         type="number"></input>
       ID filter</p>
       
{posts.map((post:any) => {
         return (
            <div  className="table" onClick={toggleModal }  key={post.id}>
              
               <div  onClick={()=>{setProductId(post.id)}} style={{backgroundColor: post.color}}>id: {post.id}</div>
             
               <div onClick={()=>{setProductId(post.id)}} style={{backgroundColor: post.color}}>name: {post.name}</div>
               <div onClick={()=>{setProductId(post.id)}} style={{backgroundColor: post.color}}>year: {post.year}</div>
            </div>
           
         );
  
      })}
       
       <button className="button" onClick={()=>{if(page>1)setPage(page-1)}}> <i className="arrow left"></i>previous</button>
       <button className="button" onClick={()=>{if(page<3)setPage(page+1)}}>next <i className="arrow right"></i></button>
      {error && <div className="ERROR">ERROR!!</div>} 
      
   </div>

   ); 
 }
 
 






export default App;
