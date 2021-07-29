//UI vars
const itemList = document.getElementById('itemList');
const addState = document.getElementById('addState');
const editState = document.getElementById('editState');
const itemInput = document.getElementById('item');
const caloriesInput = document.getElementById('calories');
const meal_id = document.getElementById('meal_id');
const totalCalories = document.getElementById('totalCalories');

class UI {
    displayItems(items) {
        let output = ``;
        items.forEach((item, index) => {
            output += `<li class="collection-item">
            ${item.meal}: ${item.calories}<a href="#" class="secondary-content edit" id=${index}><i class="fas fa-pencil-alt"></i></a>
            </li>`
        });
        itemList.innerHTML = output;
    }

    displayCalories(calories) {
        //Display total calories.
        totalCalories.innerText = calories;
    }

    displayEditForm(item, id) {
        //Hide addState buttons.
        addState.classList.add('hide');
        //Show editState buttons.
        editState.classList.remove('hide');
        editState.classList.add('show');
        //Set id of editState as meal id.
        meal_id.value = id;
        //Set values of itemInput and caloriesInput to meal values.
        itemInput.value = item.meal;
        caloriesInput.value = item.calories;
    }

    displayAddForm() {
        //Remove meal id from dom.
        meal_id.value = '';
        //hide editState buttons.
        editState.classList.add('hide');
        //Show addState buttons.
        addState.classList.remove('hide');
        addState.classList.add('show');
        //Reet values of itemInput and caloriesInput to meal values.
        this.inputReset();
    }

    inputReset() {
        itemInput.value = '';
        caloriesInput.value = '';
    }

    totalReset() {
        this.displayAddForm();
        //Reset calories if any.
        totalCalories.innerText = '';
        //Empty item list.
        itemList.innerHTML = '';
    }

}