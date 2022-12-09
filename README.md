# NotaBene
Welcome to NotaBene--an efficient and convenient tool to keep track of your tasks and notes!

You can visit NotaBene by clicking [here](http://notabene.us-east-2.elasticbeanstalk.com/)

# Setting Up the Project

Please follow these instructions to locally set up this project!

Once you have downloaded the code from this repository, please go to your terminal, cd into the root folder, and then run "npm install". This will install all the needed node modules. 

The current version is not using PostgreSQL just yet, but once it does, make sure to add your user and password to the env.json file, then, create the database and tables by running the command "psql --username USERNAME -f setup.sql", replacing USERNAME with your Postgres username. However, for now, skip this step.

Finally, run "npm start", which will cd into the app directory and run the server.js file.

# User Manual

The following sections describe features that NotaBene has to offer!

## Main Page

On the main page, the primary feature that is presented to you is the task list, which has two different views, the single list view and the multiple lists view. These views can be toggled back and forth by clicking on the respective button. The default view mode is the single list view.

### Single List View

The single list view displays all your tasks in one list at the center of the page. 

You can add tasks in two ways; the first way is to use the quick add bar at the bottom of the task list. Once you type in a task name, you can either hit "Enter" on your keyboard or click the "+" button. 

The other way to add a task is by clicking on the "Add Task" button on the right. This opens up the task addition menu, which allows you to provide more information regarding the task. The only required field is the task name. Other fields include task description, due date, list selection, and category selection. For lists and categories, if there are no lists or categories, or you wish to create new ones, you can enter in a name to add it to the selection menu on the spot! You can only select one list for eveery task, however, you can choose any number of categories.

If you are done with a task, you can click on the checkmark option on the list next to the task name. Similarly, if you want to delete a task, you can click on the "X" button for that task. 

If you want to edit a task, you can click on it in the list as this opens up the edit menu. You can modify any information as needed and then save the task. This menu also gives you the option to delete the task if you so wish.

Another feature that this view offers is a filtering system on the left hand side of the screen. Once there are lists and/or categories, you can click on the list or category to see tasks within that list or containing that category. You can click on it again to deselect it. 

You can also sort your tasks by using the sort feature on the right hand side. You can sort tasks by:
    - Due Sooner
    - Due Later
    - Most Recent
    - Least Recent
    - A to Z
    - Z to A
    - List

The default sort option is "Least Recent". For the "Due Sooner" and "Due Later" options, if your tasks are not given a due date, they will show up after the other tasks with due dates. Likewise, for the "List" option, tasks not in a list will show up last.

### Multiple Lists View

The multiple lists view displays all your tasks in their respective lists. Please note that tasks that do not have a list will not show up in this view. Once you have create lists in the single list view, you can see them show up in this multiple lists view.

Every list in this view has a quick add bar that lets you quickly add a task to that list. Like the single list view, you can also edit the task by clicking on it and mark it as done or delete it by clicking on its corresponding button.

## Notes

On the notes page, you can create and view your notes. Your notes are organized in groups, which can be added by using the field at the buttom of the page or the fields in the note creation and editing menus. Also in the note creation and editing menus are fields for the note's name and its contents. Please note that to get to the editing menu, you must first create and select a note as this will prompt the edit button to show up on the right hand side of the screen. In the editing menu, you also have the option to delete this note.

You can click on a group to expand or collapse its tasks and if you click on a note, you can view its contents on the right hand side of the screen.

## Settings

Besides its productivity features, NotaBene also lets you customize the site to your liking! You can do this by going to the "settings" tab in the navigation bar at the top of the screen and choosing a theme. You can see the theme's colors displayed in this settings menu. Once you have selected your favorite set of colors, the site will update after you close out of this menu!

# Future Updates

In the future, I plan on working on the following:
    - Switch to PostgreSQL to manage all information 
    - Improve the user interface with better styling
    - Incorporate drag and drop capabilities for tasks and notes
    - Implement a color code system for lists, categories, and groups
    - Allow the multiple lists view to sort and filter lists
    - Incorporate a word processor for note-taking
    - Allow notes and groups to be sorted and filtered
    - Implement a dark mode for more customization
    - Add more themes!