var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('site');
var tbody = document.getElementById('tbody');
var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
showMarks()
function addMark() {
    var siteName = siteNameInput.value.trim();
    var siteUrl = siteUrlInput.value.trim();

    if (!siteName) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Site name is required!',
            confirmButtonText: 'OK'
        });
        return;
    }
    if (!siteUrl || !is_Url(siteUrl)) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Enter a valid URL (e.g., https://example.com)!',
            confirmButtonText: 'OK'
        });
        return;
    }

    var bookmark = { name: siteName, url: siteUrl };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    siteNameInput.value = '';
    siteUrlInput.value = '';
    showMarks();
}

function is_Url(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(url);
}

function showMarks() {
    tbody.innerHTML = `
        <tr>
            <td>Index</td>
            <td>Website Name</td>
            <td>Visit</td>
            <td>Delete</td>
        </tr>`;

    bookmarks.forEach((bookmark, index) => {
        var row = `
            <tr>
                <td>${index + 1}</td>
                <td>${bookmark.name}</td>
                <td><a href="${bookmark.url}" target="_blank">Visit</a></td>
                <td><button class="text-danger bg-light" onclick="deleteMark(${index})"><i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

function deleteMark(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            showMarks();
            Swal.fire('Deleted!', 'The bookmark has been removed.', 'success');
        }
    });
}