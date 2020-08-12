// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e){
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
    }

    // Local Storage
    // localStorage.setItem('test', 'Hello world');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form after submitting
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form submitting
    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop throught bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    // reset localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=   '<div class="card bg-light text-dark card-body">' +
                                            '<h3>' +name+ 
                                            '   <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a>' +
                                            '   <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                            '</h3>' +
                                        '</div>';
    }
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}