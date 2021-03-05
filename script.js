// const tbody = document.querySelector('#album-table > tbody')
const tbodyPosts = document.querySelector('#posts-table > tbody')
const btnClose = document.querySelector('#btn-close')
const btnCloseSec = document.querySelector('#btnCloseSec')


const modalTitle = document.querySelector('#modalTitle')
const modalBody = document.querySelector('#modalBody')
const users = []



// запрос к списку пользователей
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        json.forEach(user => {
            users.push(user)
        })
    })









function renderPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {

            json.forEach(post => {

                let usersData = users.find((user) => user.id === post.userId)
                let comentDataLth = 0

                let tr = document.createElement('tr')

                let userId = document.createElement('td')
                let postId = document.createElement('td')
                let postTitle = document.createElement('td')
                let postBody = document.createElement('td')

                userId.textContent = usersData.name
                postId.textContent = post.id

                //находим количество коментов и ссылка на модальное окно
                fetch(`https://jsonplaceholder.typicode.com/comments?postId=` + post.id)
                    .then(response => response.json())
                    .then(json => {


                        json.forEach(coment => {
                            comentDataLth = json.length
                            postTitle.innerHTML = `${post.title} <a href='#' class='modal-open' data-bs-toggle="modal" data-bs-target="#modal"  data-coment-id="${post.id}"> (${comentDataLth})</a>`

                        })
                    })

                postBody.textContent = post.body

                tr.appendChild(postId)
                tr.appendChild(userId)
                tr.appendChild(postTitle) //колличество коментов и ссылка на них
                tr.appendChild(postBody)

                tbodyPosts.appendChild(tr)

            })
            // 
            const c2 = document.querySelectorAll("a[data-bs-target='#modal']")
            console.log(c2.length);
            // 
            $('#posts-table').DataTable();
        })
}
renderPosts()






// 
const comentLinks = document.querySelectorAll('a[data-bs-toggle="modal"]')
console.log(comentLinks.length);
// 


comentLinks.forEach(link => {
    link.onclick = function (e) {
        e.preventDefault()
        console.log(ияавпия)
        // Дописать тайтл
        //    modalTitle.textContent = this.postTitle.textContent
        //    console.log(this.textContent)
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.getAttribute('data-coment-id')}`)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                json.forEach(coment => {

                    let tr = document.createElement('tr')

                    let comId = document.createElement('td')
                    let comName = document.createElement('td')
                    let comEmail = document.createElement('td')
                    let comBody = document.createElement('td')


                    comId.textContent = coment.id
                    comName.textContent = coment.name
                    comEmail.innerHTML = `<a href='mailto:${coment.email}' >${coment.email}</a>`
                    comBody.textContent = coment.body


                    tr.appendChild(comId)
                    tr.appendChild(comName)

                    tr.appendChild(comEmail)
                    tr.appendChild(comBody)

                    modalBody.appendChild(tr)


                })
                // console.log(modalBody)
                btnClose.addEventListener("click", function (e) {
                    modalBody.innerHTML = ''
                })
                btnCloseSec.addEventListener("click", function (e) {
                    modalBody.innerHTML = ''
                })
            })
    }
})