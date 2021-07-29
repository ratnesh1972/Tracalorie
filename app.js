const ui = new UI;
let totalMeals = [];

//Event listeners
document.getElementById('addItem').addEventListener('click', addItem);
document.getElementById('itemList').addEventListener('click', editForm);
document.getElementById('backItem').addEventListener('click', goBack);
document.getElementById('nav-mobile').addEventListener('click', clearTasks);
document.getElementById('deleteItem').addEventListener('click', deleteItem);
document.getElementById('editItem').addEventListener('click', editItem);

function addItem() {
    //Get meal data.
    const meal = itemInput.value;
    const calories = caloriesInput.value;

    if (meal !== '' && calories > 0) {
        totalMeals.push({ meal, calories });
        //Display meal item.
        ui.displayItems(totalMeals);
        //Display calories.
        ui.displayCalories(getTotalCalories(totalMeals));
        //Reset form.
        ui.inputReset();
    } else {
        alert('Please enter valid input!');
    }
}

function editForm(e) {
    const ele = e.target.parentElement;
    if (ele.classList.contains('edit')) {
        //Get id of data for that meal item.
        let id = ele.id;
        //Display update form for meal item.
        ui.displayEditForm(totalMeals[id], id);

    } else {
        console.log('Do not update this item!');
    }
}

function deleteItem() {
    //Reset to add item form UI.
    ui.displayAddForm();
    //Remove element from totalMeals.
    totalMeals.splice(meal_id.value, 1);
    //Display meal item.
    ui.displayItems(totalMeals);
    //Display calories.
    ui.displayCalories(getTotalCalories(totalMeals));

}

function editItem() {
    //Get meal data.
    const meal = itemInput.value;
    const calories = caloriesInput.value;
    const mealItem = totalMeals[meal_id.value];
    if (meal !== '' && calories > 0) {
        //Update meal data.
        mealItem.meal = meal;
        mealItem.calories = calories;
        //Reset inputs and display add item form ui.
        ui.displayAddForm();
        //Display meal item.
        ui.displayItems(totalMeals);
        //Display calories.
        ui.displayCalories(getTotalCalories(totalMeals));
    } else {
        alert('Please enter valid input!');
    }
}

function goBack() {
    //Reset inputs and display add item form ui.
    ui.displayAddForm();
}

function clearTasks(e) {
    if (e.target.classList.contains('clear')) {
        totalMeals = [];
        ui.totalReset();
    }
}

const getTotalCalories = (meals) => {
    let calories = 0;
    meals.forEach(item => calories += Number.parseInt(item.calories));
    return calories;
}