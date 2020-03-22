var items;
        var input = document.getElementById('new-item');
        var url = "http://localhost:3000/todo/";

        async function getItem() {
            await axios.get(url).then(res => {return items = res.data}).then(() => {
                render(items)}); 
                input.value = '';
        }
        getItem();

        async function addItem() {            
            //var input = document.getElementById('new-item');           
            await axios.post(url, {content: input.value});
            getItem();            
        }        
        var addBtn = document.getElementById('add-btn');
        addBtn.addEventListener('click', addItem); 

        async function delItem() { 
            id = parseInt(event.target.dataset.value);  
            console.log(id);   
            await axios.delete(url + id);        
            getItem();
            render(items);
        }

        async function editItem() { 
            id = parseInt(event.target.dataset.value);
            console.log(id);   
            await axios.put(url + id, {content: input.value});        
            getItem();
            render(items);
            input.value = '';
        }

        function render(items) {
            var htmlList = document.getElementById("todo-list");
            var content = items.map(function(item, index) {
                return '<li>' + item.content  + ' ' + '<button onclick = "editItem()", data-value ="' + item.id + '">Edit</button><button onClick ="delItem()", data-value ="' + item.id + '">Delete</button>'  + '</li>' ;
            });
            htmlList.innerHTML = content.join('');
        }