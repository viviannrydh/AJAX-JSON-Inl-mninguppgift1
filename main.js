let authorButton=document.getElementById('authorButton')
let userInput=document.getElementById('user-input')
let mainContent=document.getElementById('main-container')

authorButton.addEventListener('click', fetchDataByAuthor)
async function fetchDataByAuthor(){
    try{
    mainContent.innerHTML='';
    const response=await fetch('http://openlibrary.org/search.json?author='+userInput.value);
    const data=await response.json();
    let books=data.docs;
  
    let  htmlContent='';
    for(let book of books){
        console.log(book);
        const bookTitle=book.title_suggest;
        const coverId=book.cover_i;
        const authorName=book.author_name;
      
        htmlContent+=generateHTMLContent(bookTitle, authorName, coverId);
       
    }
    } catch(error){   
    }
}


function generateHTMLContent(title, name, id){
    let contentItems=document.createElement('div');
    contentItems.className="card";

    let informationDiv=document.createElement('div');
    informationDiv.className="information-div";

    
    let bookName=document.createElement('h3');
    bookName.className="book-name";
    

    let bookNav=document.createElement('a');
    //bookNav.target="_blank";
    bookNav.href=(`#`);
    bookNav.id=`${title}`;
    bookNav.innerHTML=`<h3>${title}</h3>`; 
    
    
    let writerName=document.createElement('i');
    writerName.className="author-name";
    writerName.innerHTML=`${name}`;

    let cover=document.createElement('p');
    cover.className="cover-id";
    cover.innerHTML=`Cover-Id: ${id}`; 

    let buttonsDiv=document.createElement('div');
    buttonsDiv.className="buttons-div";

    let coverImg=document.createElement('img'); 
    coverImg.id=`${id}`;
    coverImg.src='http://covers.openlibrary.org/b/id/8406786-S.jpg' ; 
    
    let searchButton=document.createElement('BUTTON');
    searchButton.className="book-details";
    searchButton.id=`${id}`;
    searchButton.target="_blank";
    searchButton.innerHTML="Get cover image"; 

    bookName.appendChild(bookNav);
    informationDiv.appendChild(bookName);
    informationDiv.appendChild(writerName);
    informationDiv.appendChild(cover);

    buttonsDiv.appendChild(coverImg);
    //buttonsDiv.appendChild(searchButton);

    contentItems.appendChild(informationDiv);
    contentItems.appendChild(buttonsDiv);
    mainContent.appendChild(contentItems); 


    bookNav.addEventListener('click', fetchEachBookDetail);
    
    async function fetchEachBookDetail(){

        mainContent.innerHTML='';
        let parameter=this.id;

        try{
         
        const response=await fetch('http://openlibrary.org/search.json?title='+parameter);
        const data=await response.json();
        const books = data["docs"]

        let  htmlContent='';

        for(let book of books){

                const bookName=book.title;
                const authorName=book.author_name;
                const bookEdition=book.edition_key;
                const bookSubject=book.subject;
                const publishYear=book.publish_year;
                const language=book.language;
                const isbn=book.isbn;
               
            htmlContent=generateBookDetailHTML(bookName,authorName,bookEdition,bookSubject,publishYear,language,isbn);
            
            }
        } catch(error){
            console.log(error);
        } }
    }
        
    function generateBookDetailHTML(title,author,edition,subject,publish,language,isbn){

        let contentItems=document.createElement('div');
        contentItems.className='detail-div';
        let name=document.createElement('h3');
        name.className='book-title';
        name.innerHTML=`${title}`;
        let writer=document.createElement('p');
        writer.className='author-name';
        writer.innerHTML=`<strong>Author(s)</strong>:${author}`;      
        let editionList=document.createElement('p');
        editionList.innerHTML=`<strong>Editions</strong>: ${edition.join(', ')}`;      
        let subjectList=document.createElement('p');
        subjectList.innerHTML=`<strong>Subject</strong>: ${subject.join(', ')}`;
        let yearList=document.createElement('p');
        yearList.innerHTML=`<strong>Publish Years</strong>: ${publish.join(', ')}`;
        let languageList=document.createElement('p');
        languageList.innerHTML=`<strong>Language</strong>: ${language}`;
        let isbnList=document.createElement('p');
        isbnList.innerHTML=`<strong>ISBN</strong>: ${isbn.join(', ')}`;
        contentItems.appendChild(name);
        contentItems.appendChild(writer);
        contentItems.appendChild(editionList);
        contentItems.appendChild(subjectList);
        contentItems.appendChild(yearList);
        contentItems.appendChild(languageList);
        contentItems.appendChild(isbnList);
        mainContent.appendChild(contentItems);
    }


    let subjectSearchInput=document.getElementById('user-subject-input');
    let subjectSearchButton=document.getElementById('subject-button');
    subjectSearchButton.addEventListener('click', fetchSubjectData);

    async function fetchSubjectData(){
        mainContent.innerHTML='';
        try{
            const response=await fetch('http://openlibrary.org/subjects/'+subjectSearchInput.value+'.json')
            const data=await response.json();
            const books=data.works;
            let htmlContent='';
            for(const book of books){
                console.log(book);
                const bookName=book.title;
                const authors=book.authors[0].name;
                const subject=book.subject;
                const coverId=book.cover_id;
                htmlContent+=generateHTMLContentBySubject(bookName,authors,subject,coverId);            
            }
        } catch {(error)=>{
            document.getElementById('error-container').innerHTML=error;
        }}};

function generateHTMLContentBySubject(title, name, subject, id){
            let contentItems=document.createElement('div');
            contentItems.className="card";
        
            let informationDiv=document.createElement('div');
            informationDiv.className="subject-div";
        
            
            let bookName=document.createElement('h3');
            bookName.className="book-name";
            
        
            let bookNav=document.createElement('a');
            //bookNav.target="_blank";
            bookNav.href=(`#`);
            bookNav.id=`${title}`;
            bookNav.innerHTML=`<h3>Title: ${title}</h3>`; 
            
            
        
            let writerName=document.createElement('i');
            writerName.className="author-name";
            writerName.innerHTML=`Author: ${name}`;
        
            let cover=document.createElement('p');
            cover.className="cover-id";
            cover.innerHTML=`Cover-Id: ${id}`;
        
            let subjectList=document.createElement('p');
            subjectList.innerHTML=`${subject.join(', ')}`;

           // let coverImg=document.createElement('img');   
            
            let searchButton=document.createElement('BUTTON');
            searchButton.className="book-details";
            searchButton.id=`${id}`;
            searchButton.target="_blank";
            searchButton.innerHTML="Start to read"; 
        
            bookName.appendChild(bookNav);
            informationDiv.appendChild(bookName);
            informationDiv.appendChild(writerName);
            //informationDiv.appendChild(cover);
        
            informationDiv.appendChild(cover);
            informationDiv.appendChild(subjectList)
            informationDiv.appendChild(searchButton);
        
            contentItems.appendChild(informationDiv);
            
            mainContent.appendChild(contentItems); 

            bookNav.addEventListener('click', fetchEachBookDetail)
    
        async function fetchEachBookDetail(){
            mainContent.innerHTML='';
            let parameter=this.id;

            try{
            
            const response=await fetch('http://openlibrary.org/search.json?title='+parameter);
            const data=await response.json();
            const books = data["docs"]

            let  htmlContent='';

            for(let book of books){

                    const bookName=book.title;
                    const authorName=book.author_name;
                    const bookEdition=book.edition_key;
                    const bookSubject=book.subject;
                    const publishYear=book.publish_year;
                    const language=book.language;
                    const isbn=book.isbn;
                
                htmlContent=generateBookDetailHTML(bookName,authorName,bookEdition,bookSubject,publishYear,language,isbn);
                
                }
            } catch(error){

            } }
    }

         




