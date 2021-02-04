class User{
    constructor(name, phone) {
        this.data = {
            name: name,
            phone: phone
        };
    };

    get(){
        return this.data;
    };

};

class Contacts{
    constructor(){
        this.users = JSON.parse(localStorage.getItem('contactsData')) || [];
    };

    set storage({name, phone}){
        const user = new User(name, phone); 
        this.users.push({id: this.users.length, ...users.get});
        localStorage.setItem('contactsData', JSON.stringify(this.users));
        document.cookie = "storageExpiration=Contacts_" + this.users.length + "; max-age=" + (60 * 60 * 24 * 10);

    };


    async getData() {
        let response = await fetch('https://jsonplaceholder.typicode.com/users'),
            data;
            
        if (response.ok) data = await response.json();   
        data.forEach(user => {
            this.storage = {name: user.name, phone: user.phone};
        });
        this.newContact();
    };

    
    edit(id, name, phone){
        this.users[id].name = name;
        this.users[id].phone = phone;
    };


    remove(id) {
        delete this.users[id];
    }

    get storage() {
        return JSON.parse(localStorage.getItem('conracrsData'));
    }

    // remove(id){
    //     this.users = this.users.forEach(function(item, i) {
    //         for (j = 0; j < this.users.length; j++) {
    //           if (item.id == this.users[j]) {
    //             this.users.splice(i, 1);
    //           };
    //         };
    //       });
    // };

};

class ContactsApp extends Contacts{
    constructor(data){
        super(data);
    };

    newContact(){
        const localContacts = localStorage.getItem('contactsData'),
            dataContacts  = JSON.parse(localContacts);

        dataContacts.map(users => {
            if (users == null) {
                return;
            }

        let mainContainer = document.querySelector('.contacts');

        let name = document.querySelector('input[name="name"]'),
            phone = document.querySelector('input[name="phone"]');

        let newContact = document.createElement('li');
        newContact.classList.add('new_contact');
        newContact.innerHTML = `
            <p>${name.value}</p>
            <p>${phone.value}</p>
        `;
        mainContainer.appendChild(newContact);

        let btnEdit = document.createElement('button');
            btnEdit.classList.add('btn_edit');
            btnEdit.innerHTML = 'edit';
            newContact.appendChild(btnEdit);

        let btnDelete = document.createElement('button');
            btnDelete.classList.add('btn_delete');
            btnDelete.innerHTML = 'delete';
            newContact.appendChild(btnDelete);


            btnDelete.addEventListener('click', () => {
                newContact.remove();

                function deleLocal(id){
                    let result = JSON.parse(localStorage.getItem('contactsData'));
                    delete result[id];
                    localStorage.setItem('contactsData', JSON.stringify(result));
                }
                
                // deleLocal(user.id);
            });

            btnEdit.addEventListener('click', () => {
				name = prompt('Edit', name.value);
                phone = prompt('Edit', phone.value);
                addressBook.newContact();

                function editLocal(id, name, phone){
                    let result = JSON.parse(localStorage.getItem('contactsData'));
                    result[id] = {id: id, name: name, phone: phone};
                    localStorage.setItem('contactsData', JSON.stringify(result));
                }
                editLocal()
			});

        });

    };

};

 let addressBook = new ContactsApp();



 const btnAdd = document.querySelector('.btn_add');
 btnAdd.addEventListener('click', () => {
    // // this.storage = {name: name.value, phone: phone.value};
    //  if (document.querySelectorAll('li')) {
    //      document.querySelectorAll('li').forEach(element => element.remove());
    //  }    
     addressBook.newContact();
   
 });


// if (localStorage.getItem('contactsData') == null) {
//     addressBook.getData();
//  }

//  if (addressBook.users.length > 0) {
//      addressBook.newContact();
//  }


