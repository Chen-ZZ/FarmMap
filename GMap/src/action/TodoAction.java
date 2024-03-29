package action;

import java.util.List;

import common.TodoFormatter;

import domain.Todo;

public class TodoAction extends BaseAction{
	
	private String todoEnterDate;
	private String todoDueDate;
	private String todoDescription;
	private String todoIsDone;
	
	private int selectedTodoId;
	private int selectedPId;
	private String selectedEnterDate;
	private String selectedDueDate;
	private String selectedDescription;
	private String selectedDone;
	
	public String getTodoEnterDate() {
		return todoEnterDate;
	}

	public void setTodoEnterDate(String todoEnterDate) {
		this.todoEnterDate = todoEnterDate;
	}

	public String getTodoDueDate() {
		return todoDueDate;
	}

	public void setTodoDueDate(String todoDueDate) {
		this.todoDueDate = todoDueDate;
	}

	public String getTodoDescription() {
		return todoDescription;
	}

	public void setTodoDescription(String todoDescription) {
		this.todoDescription = todoDescription;
	}

	public String getTodoIsDone() {
		return todoIsDone;
	}

	public void setTodoIsDone(String todoIsDone) {
		this.todoIsDone = todoIsDone;
	}

	public int getSelectedTodoId() {
		return selectedTodoId;
	}

	public void setSelectedTodoId(int selectedTodoId) {
		this.selectedTodoId = selectedTodoId;
	}

	public int getSelectedPId() {
		return selectedPId;
	}

	public void setSelectedPId(int selectedPId) {
		this.selectedPId = selectedPId;
	}

	public String getSelectedEnterDate() {
		return selectedEnterDate;
	}

	public void setSelectedEnterDate(String selectedEnterDate) {
		this.selectedEnterDate = selectedEnterDate;
	}

	public String getSelectedDueDate() {
		return selectedDueDate;
	}

	public void setSelectedDueDate(String selectedDueDate) {
		this.selectedDueDate = selectedDueDate;
	}

	public String getSelectedDescription() {
		return selectedDescription;
	}

	public void setSelectedDescription(String selectedDescription) {
		this.selectedDescription = selectedDescription;
	}

	public String getSelectedDone() {
		return selectedDone;
	}

	public void setSelectedDone(String selectedDone) {
		this.selectedDone = selectedDone;
	}

	/**
	 * @author Chen
	 */
	public String addPaddockTodo(){
		
		short farmId = (Short) session.get("farmId");
		
//		System.out.println("selectedPId: " + selectedPId);
//		System.out.println(todoEnterDate);
//		System.out.println(todoDueDate);
//		System.out.println(todoDescription);
//		System.out.println(todoIsDone);
		
		if (todoEnterDate.equals("")) {
			return ERROR;
		} else {
			
			if (todoIsDone.equals("false")) {
				todoService.addTodo((short) selectedPId, farmId, todoEnterDate, todoDueDate, todoDescription, false);	
				List<TodoFormatter> ltf = todoService.listTodoByPaddockForForm(farmId, (short)selectedPId);
				session.remove("paddockTodosFromDB");
				session.put("paddockTodosFromDB", ltf);
			}else {
				todoService.addTodo((short) selectedPId, farmId, todoEnterDate, todoDueDate, todoDescription, true);
				List<TodoFormatter> ltf = todoService.listTodoByPaddockForForm(farmId, (short)selectedPId);
				session.remove("paddockTodosFromDB");
				session.put("paddockTodosFromDB", ltf);
			}
			
			return SUCCESS;
		}
		
		
		
	}
	
	public String editPaddockTodo(){
		
		short farmId = (Short) session.get("farmId");
		
		if (todoIsDone.equals("false")) {
			todoService.updateTodo((short) selectedTodoId, todoEnterDate, todoDueDate, selectedDescription, false);
			List<TodoFormatter> ltf = todoService.listTodoByPaddockForForm(farmId, (short)selectedPId);
			session.remove("paddockTodosFromDB");
			session.put("paddockTodosFromDB", ltf);
		} else {
			todoService.updateTodo((short) selectedTodoId, todoEnterDate, todoDueDate, selectedDescription, true);
			List<TodoFormatter> ltf = todoService.listTodoByPaddockForForm(farmId, (short)selectedPId);
			session.remove("paddockTodosFromDB");
			session.put("paddockTodosFromDB", ltf);
		}
		
		return SUCCESS;
	}
	
	public String deletePaddockTodo(){
		short farmId = (Short) session.get("farmId");
		
		todoService.deleteTodo((short)selectedTodoId);
		List<TodoFormatter> ltf = todoService.listTodoByPaddockForForm(farmId, (short)selectedPId);
		session.remove("paddockTodosFromDB");
		session.put("paddockTodosFromDB", ltf);
		return SUCCESS;
	}
}
