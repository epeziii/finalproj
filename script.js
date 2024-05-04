document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('homePage');
    const addMealPage = document.getElementById('addMealPage');
    const myMealsPage = document.getElementById('myMealsPage');
    const mealList = document.getElementById('mealList');
    const addMealForm = document.getElementById('addMealForm');
    
    const userId = ''; // Get user ID from JWT token or session

    document.getElementById('home').addEventListener('click', () => {
        showPage('homePage');
    });
    
    document.getElementById('login').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to login page
    });

    document.getElementById('addMeal').addEventListener('click', () => {
        showPage('addMealPage');
    });

    document.getElementById('myMeals').addEventListener('click', async () => {
        showPage('myMealsPage');
        mealList.innerHTML = '';
        const response = await fetch(`/meals/${userId}`);
        const meals = await response.json();
        meals.forEach(meal => {
            const li = document.createElement('li');
            li.textContent = `${meal.mealName} - ${meal.calories} calories`;
            mealList.appendChild(li);
        });
    });

    addMealForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const mealName = document.getElementById('mealName').value;
        const calories = document.getElementById('calories').value;
        await fetch('/add-meal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                mealName,
                calories
            })
        });
        addMealForm.reset();
        alert('Meal added successfully!');
    });

    document.getElementById('logout').addEventListener('click', () => {
        // Logout logic
    });

    function showPage(pageId) {
        const pages = document.querySelectorAll('.container');
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }
});
