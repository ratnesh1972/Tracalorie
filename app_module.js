//Storate Controller
const StorageCntr = (function () {

    return {
        addItemToLocalStorage: function (item) {
            let items;

            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }

            items.push(item);
            localStorage.setItem('items', JSON.stringify(items));
        },
        getItemsFromLocalStorage: function () {
            let items;

            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemInLocalStorage: function (id, item) {
            let items;
            items = JSON.parse(localStorage.getItem('items'));
            items[id] = item;
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteFromLocalStorage: function (id) {
            let items;
            items = JSON.parse(localStorage.getItem('items'));
            items.splice(id, 1);
            localStorage.setItem('items', JSON.stringify(items));
        },
        resetItemsInLocalStorage: function () {
            let items = [];
            localStorage.setItem('items', JSON.stringify(items));
        }
    }
})();
//Item Controller
const ItemCntr = (function () {
    //Item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //Data structure / State
    const data = {
        items: StorageCntr.getItemsFromLocalStorage(),
        totalCalories: 0,
    }

    //Public Methods
    return {
        //Return all data items.
        getItems: function () {
            return data.items;
        },
        //Return single item based on Id.
        getItem: function (id) {
            return data.items[id];
        },
        //Update item with new values
        updateItem: function (id, item) {
            console.log(item);
            data.items[id] = item;
        },
        //Delete item.
        deleteItem: function (id) {
            data.items.splice(id, 1);
        },
        resetItems: function () {
            data.items = [];
            data.totalCalories = 0;
        },
        //Return total calories
        getTotalCalories: function () {
            let totalCalories = 0;
            data.items.forEach(item => totalCalories += item.calories);
            data.totalCalories = totalCalories;
            return data.totalCalories;
        },
        //Add new item to data.
        addItem: function (name, calories) {
            let ID;

            //Set next id.
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create new item.
            const newItem = new Item(ID, name, calories);

            //Add to data items.
            data.items.push(newItem);

            //Increase total calories.
            data.totalCalories += newItem.calories;

            return newItem;
        },
        //Log data.
        logData: function () {
            console.log(data);
        }
    }
})();

//UI Controller
const UICntr = (function () {
    const UISelectors = {
        itemList: '#itemList',
        addStateBtn: '#addStateBtn',
        editStateBtn: '#editStateBtn',
        itemInput: '#item',
        caloriesInput: '#calories',
        item_id: '#item_id',
        totalCalories: '#totalCalories',
        addItem: '#addItem',
        editForm: '#itemList',
        goBack: '#backItem',
        clearTasks: '#nav-mobile',
        deleteItem: '#deleteItem',
        editItem: '#editItem',
    }

    const State = {
        currentState: 'addItem-state'
    }

    return {
        displayItems: function (items) {
            let output = ``;
            items.forEach((item, index) => {
                output += `<li class="collection-item">
            ${item.name}: ${item.calories}<a href="#" class="secondary-content edit" id=${index}><i class="fas fa-pencil-alt"></i></a>
            </li>`
            });

            //Add HTML to lists.
            document.querySelector(UISelectors.itemList).innerHTML = output;
        },
        //Get all the ui selectors.
        getSelectors: function () {
            return UISelectors;
        },
        //Get input vals for new meal item.
        getInputVals: function () {
            return {
                name: document.querySelector(UISelectors.itemInput).value,
                calories: document.querySelector(UISelectors.caloriesInput).value
            }
        },
        //Add new item to lists.
        addItemToList: function (item) {
            //Create a li element
            const li = document.createElement('li');
            li.classList = 'collection-item';
            //Add item to li
            li.innerHTML = `${item.name}: ${item.calories}<a href="#" class="secondary-content edit" id=${item.id}><i class="fas fa-pencil-alt"></i></a>`
            //Append li element to lists.
            document.querySelector(UISelectors.itemList).appendChild(li);
        },
        displayTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).innerText = totalCalories;
        },
        resetInputVals: function () {
            document.querySelector(UISelectors.itemInput).value = '';
            document.querySelector(UISelectors.caloriesInput).value = '';
        },
        setEditStateVals: function (item) {
            document.querySelector(UISelectors.itemInput).value = item.name;
            document.querySelector(UISelectors.caloriesInput).value = item.calories;
            document.querySelector(UISelectors.item_id).value = item.id;
        },
        clearEditStateVals: function () {
            UICntr.resetInputVals();
            document.querySelector(UISelectors.item_id).value = '';
        },
        getCurrentState: function () {
            return State.currentState;
        },
        changeState: function () {
            //Check currents tate.
            if (State.currentState === 'addItem-state') {
                //Change state to edit state.
                State.currentState = 'editItem-state';

                //hide add state buttons.
                document.querySelector(UISelectors.addStateBtn).classList.add('hide');
                //show edit state buttons.
                document.querySelector(UISelectors.editStateBtn).classList.remove('hide');
                document.querySelector(UISelectors.editStateBtn).classList.add('show');
            } else {
                //Change state to add item state.
                State.currentState = 'addItem-state';

                //Set input fields & id to empty.
                UICntr.clearEditStateVals();

                //hide edit state buttons.
                document.querySelector(UISelectors.editStateBtn).classList.remove('show');
                document.querySelector(UISelectors.editStateBtn).classList.add('hide');

                //show edit state buttons.
                document.querySelector(UISelectors.addStateBtn).classList.remove('hide');
                document.querySelector(UISelectors.addStateBtn).classList.add('show');
            }
        },
        //Get item_id
        getItemId: function () {
            return document.querySelector(UISelectors.item_id).value;
        }
    }
})();

//Main App controller
const AppCntr = (function () {

    const loadEventListeners = function () {
        const UISelectors = UICntr.getSelectors();
        //Add item event.
        document.querySelector(UISelectors.addItem).addEventListener('click', addItem);
        //change state event.
        document.querySelector(UISelectors.itemList).addEventListener('click', changeToEditState);
        //Edit item event.
        document.querySelector(UISelectors.editItem).addEventListener('click', editItem);
        //delete item event.
        document.querySelector(UISelectors.deleteItem).addEventListener('click', deleteItem);
        //clear edit state event.
        document.querySelector(UISelectors.goBack).addEventListener('click', clearEditState);
        //clear data.
        document.querySelector(UISelectors.clearTasks).addEventListener('click', clearData);
    }

    const addItem = function () {
        //Get item data.
        const item = UICntr.getInputVals();
        item.calories = Number.parseInt(item.calories);

        if (item.name !== '' && item.calories > 0) {
            //Add new item to data items.
            const newItem = ItemCntr.addItem(item.name, item.calories);
            //add items to local storage.
            StorageCntr.addItemToLocalStorage(newItem);
            //Add new item to UI.
            UICntr.addItemToList(newItem);
            //Add calories to UI.
            UICntr.displayTotalCalories(ItemCntr.getTotalCalories());
            //Reset input fields.
            UICntr.resetInputVals();
        }
    }

    const changeToEditState = function (e) {
        if (e.target.parentElement.classList.contains('edit')) {

            //Check current state
            const currentState = UICntr.getCurrentState();
            if (currentState === 'addItem-state') {
                //Change state to edit state.
                UICntr.changeState();
            }

            //Get current values of item using id.
            const item = ItemCntr.getItem(e.target.parentElement.id);

            //Add input fields & id values to edit state form.
            UICntr.setEditStateVals(item);
        }
    }

    const editItem = function () {
        //Check if current state is edit state.
        if (UICntr.getCurrentState() === 'editItem-state') {
            const item = UICntr.getInputVals();
            if (item.name !== '' && item.calories !== '') {
                //get current item id.
                const id = UICntr.getItemId();
                //set id as current id of new item.
                item.id = id;
                //convert calories to int.
                item.calories = Number.parseInt(item.calories);
                //update item with new item.
                ItemCntr.updateItem(item.id, item);
                //update item in localStorage.
                StorageCntr.updateItemInLocalStorage(item.id, item);
                //change state to add item state.
                UICntr.changeState();
                //Display items and total calories.
                UICntr.displayItems(ItemCntr.getItems());
                UICntr.displayTotalCalories(ItemCntr.getTotalCalories());
            } else {
                alert('Please enter valid details!');
            }
        }
    }

    const deleteItem = function () {
        //Check if current state is edit state.
        if (UICntr.getCurrentState() === 'editItem-state') {

            //get current item id.
            const id = UICntr.getItemId();

            //delete item
            ItemCntr.deleteItem(id);

            //Delete from local storage.
            StorageCntr.deleteFromLocalStorage(id);

            //change state to add item state.
            UICntr.changeState();

            //Display items and total calories.
            UICntr.displayItems(ItemCntr.getItems());
            UICntr.displayTotalCalories(ItemCntr.getTotalCalories());
        }
    }

    const clearEditState = function () {
        if (UICntr.getCurrentState() === 'editItem-state') {
            UICntr.changeState();
        }
    }

    const clearData = function () {
        //Reset data items.
        ItemCntr.resetItems();

        //Reset items in local Storage.
        StorageCntr.resetItemsInLocalStorage();

        if (UICntr.getCurrentState() === 'editItem-state') {
            //Change state to add item state.
            UICntr.changeState();
        } else {
            UICntr.resetInputVals();
        }

        //Display items and total calories.
        UICntr.displayItems(ItemCntr.getItems());
        UICntr.displayTotalCalories(ItemCntr.getTotalCalories());
    }

    return {
        init: function () {
            //Get all items.
            const items = ItemCntr.getItems();
            //Populate to list.
            UICntr.displayItems(items);
            //Populate calories.
            UICntr.displayTotalCalories(ItemCntr.getTotalCalories());
            //Load event listeners.
            loadEventListeners();
        }
    }
})();

AppCntr.init();


