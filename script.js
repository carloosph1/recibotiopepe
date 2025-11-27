document.addEventListener('DOMContentLoaded', () => {
    const receiptForm = document.getElementById('receiptForm');
    const employeeSelect = document.getElementById('employeeSelect');
    const amountInput = document.getElementById('amount');
    const descriptionSelect = document.getElementById('descriptionSelect');
    const receiptOutput = document.getElementById('receiptOutput');
    const receiptText = document.getElementById('receiptText');
    const currentDateSpan = document.getElementById('currentDate');
    const toggleDescriptionManagerButton = document.getElementById('toggleDescriptionManager');
    const descriptionManagerDiv = document.getElementById('descriptionManager');
    const newDescriptionInput = document.getElementById('newDescription');
    const addDescriptionButton = document.getElementById('addDescription');
    const descriptionListUl = document.getElementById('descriptionList');
    const toggleEmployeeManagerButton = document.getElementById('toggleEmployeeManager');
    const employeeManagerDiv = document.getElementById('employeeManager');
    const newEmployeeInput = document.getElementById('newEmployee');
    const addEmployeeButton = document.getElementById('addEmployee');
    const employeeListUl = document.getElementById('employeeList');

    const COMPANY_NAME = "Garrido Restaurante Ltda";
    const COMPANY_CNPJ = "12.045.985/0001-50";
    const LOCAL_STORAGE_DESCRIPTION_KEY = 'receiptDescriptions';
    const LOCAL_STORAGE_EMPLOYEE_KEY = 'receiptEmployees';

    // --- Funções de Gerenciamento de Descrições ---

    // Carrega as descrições do localStorage ou usa padrões
    const loadDescriptions = () => {
        const stored = localStorage.getItem(LOCAL_STORAGE_DESCRIPTION_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return ["Diária", "Diária Cumim", "Diária Barmen", "Entregas", "Reembolso", "Adiantamento", "Extras", "Recepcionista"]; // Padrões iniciais
    };

    const loadEmployees = () => {
        const stored = localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        return ["João Silva", "Maria Souza", "Carlos Pereira"];
    };

    let descriptions = loadDescriptions();
    let employees = loadEmployees();

    if (!localStorage.getItem(LOCAL_STORAGE_DESCRIPTION_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_DESCRIPTION_KEY, JSON.stringify(descriptions));
    }

    if (!localStorage.getItem(LOCAL_STORAGE_EMPLOYEE_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_EMPLOYEE_KEY, JSON.stringify(employees));
    }

    // Salva as descrições no localStorage
    const saveDescriptions = () => {
        localStorage.setItem(LOCAL_STORAGE_DESCRIPTION_KEY, JSON.stringify(descriptions));
    };

    const saveEmployees = () => {
        localStorage.setItem(LOCAL_STORAGE_EMPLOYEE_KEY, JSON.stringify(employees));
    };

    // Renderiza o <select> de descrições
    const renderDescriptionSelect = () => {
        const currentSelection = descriptionSelect.value;
        descriptionSelect.innerHTML = '';
        descriptions.forEach(desc => {
            const option = document.createElement('option');
            option.value = desc;
            option.textContent = desc;
            descriptionSelect.appendChild(option);
        });
        if (descriptions.length === 0) {
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Nenhuma descrição disponível';
            placeholder.selected = true;
            placeholder.hidden = true;
            placeholder.disabled = true;
            descriptionSelect.appendChild(placeholder);
            descriptionSelect.disabled = true;
        } else if (descriptions.includes(currentSelection)) {
            descriptionSelect.value = currentSelection;
            descriptionSelect.disabled = false;
        } else {
            descriptionSelect.value = descriptions[0];
            descriptionSelect.disabled = false;
        }
    };

    const renderEmployeeSelect = () => {
        const currentSelection = employeeSelect.value;
        employeeSelect.innerHTML = '';
        employees.forEach(employee => {
            const option = document.createElement('option');
            option.value = employee;
            option.textContent = employee;
            employeeSelect.appendChild(option);
        });
        if (employees.length === 0) {
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Nenhum funcionário disponível';
            placeholder.selected = true;
            placeholder.hidden = true;
            placeholder.disabled = true;
            employeeSelect.appendChild(placeholder);
            employeeSelect.disabled = true;
        } else if (employees.includes(currentSelection)) {
            employeeSelect.value = currentSelection;
            employeeSelect.disabled = false;
        } else {
            employeeSelect.value = employees[0];
            employeeSelect.disabled = false;
        }
    };

    // Renderiza a lista de descrições no gerenciador
    const renderDescriptionList = () => {
        descriptionListUl.innerHTML = '';
        descriptions.forEach((desc, index) => {
            const li = document.createElement('li');
            li.textContent = desc;
            
            // Botão de Excluir
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'X';
            deleteBtn.setAttribute('data-index', index);
            deleteBtn.onclick = () => deleteDescription(index);

            li.appendChild(deleteBtn);
            descriptionListUl.appendChild(li);
        });
    };

    const renderEmployeeList = () => {
        employeeListUl.innerHTML = '';
        employees.forEach((employee, index) => {
            const li = document.createElement('li');
            li.textContent = employee;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'X';
            deleteBtn.onclick = () => deleteEmployee(index);

            li.appendChild(deleteBtn);
            employeeListUl.appendChild(li);
        });
    };

    // Adiciona uma nova descrição
    const addDescription = () => {
        const newDesc = newDescriptionInput.value.trim();
        if (newDesc && !descriptions.includes(newDesc)) {
            descriptions.push(newDesc);
            saveDescriptions();
            renderDescriptionSelect();
            renderDescriptionList();
            newDescriptionInput.value = '';
        } else if (newDesc) {
             alert(`A descrição "${newDesc}" já existe.`);
        }
    };

    const addEmployee = () => {
        const newEmployee = newEmployeeInput.value.trim();
        if (newEmployee && !employees.includes(newEmployee)) {
            employees.push(newEmployee);
            saveEmployees();
            renderEmployeeSelect();
            renderEmployeeList();
            newEmployeeInput.value = '';
        } else if (newEmployee) {
            alert(`O funcionário "${newEmployee}" já existe.`);
        }
    };

    // Exclui uma descrição
    const deleteDescription = (index) => {
        if (descriptions.length === 1) {
            alert('Mantenha ao menos uma descrição cadastrada.');
            return;
        }
        if (confirm(`Tem certeza que deseja remover a descrição "${descriptions[index]}"?`)) {
            descriptions.splice(index, 1);
            saveDescriptions();
            renderDescriptionSelect();
            renderDescriptionList();
        }
    };

    const deleteEmployee = (index) => {
        if (employees.length === 1) {
            alert('Mantenha ao menos um funcionário cadastrado.');
            return;
        }
        if (confirm(`Tem certeza que deseja remover o funcionário "${employees[index]}"?`)) {
            employees.splice(index, 1);
            saveEmployees();
            renderEmployeeSelect();
            renderEmployeeList();
        }
    };

    // --- Funções de Utilitário ---

    // Formata o valor para moeda BRL
    const formatCurrency = (value) => {
        const amount = Number(value);
        if (Number.isNaN(amount)) {
            return '';
        }
        return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Formata a data atual
    const getFormattedDate = () => {
        const date = new Date();
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formatted = date.toLocaleDateString('pt-BR', options);
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };


    // --- Event Listeners ---

    // Alternar o Gerenciador de Descrições
    toggleDescriptionManagerButton.addEventListener('click', () => {
        descriptionManagerDiv.classList.toggle('hidden');
        toggleDescriptionManagerButton.textContent = descriptionManagerDiv.classList.contains('hidden') ? 'Gerenciar Descrições' : 'Ocultar Gerenciador';
    });

    toggleEmployeeManagerButton.addEventListener('click', () => {
        employeeManagerDiv.classList.toggle('hidden');
        toggleEmployeeManagerButton.textContent = employeeManagerDiv.classList.contains('hidden') ? 'Gerenciar Funcionários' : 'Ocultar Gerenciador';
    });

    // Adicionar Descrição
    addDescriptionButton.addEventListener('click', addDescription);
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            addDescription();
        }
    });

    addEmployeeButton.addEventListener('click', addEmployee);
    newEmployeeInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            addEmployee();
        }
    });

    // Gerar Recibo
    receiptForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const employeeName = employeeSelect.value;
        const amount = amountInput.value;
        if (!amount || Number.isNaN(Number(amount))) {
            alert('Informe um valor válido.');
            return;
        }
        const formattedAmount = formatCurrency(amount);
        const description = descriptionSelect.value;
        const dateString = getFormattedDate();

        if (!employeeName) {
            alert('Cadastre um funcionário antes de gerar o recibo.');
            return;
        }

        if (!description) {
            alert('Cadastre uma descrição antes de gerar o recibo.');
            return;
        }

        // Template do Recibo
        const receiptTemplate = 
            `Eu, <strong>${employeeName}</strong> declaro ter recebido da <strong>${COMPANY_NAME}</strong>, inscrito sob o CNPJ nº <strong>${COMPANY_CNPJ}</strong>, a importância de <strong>${formattedAmount}</strong> referente à <strong>${description}</strong>.`;

        receiptText.innerHTML = receiptTemplate;
        currentDateSpan.textContent = dateString;
        
        receiptOutput.classList.remove('hidden');
    });

    // Inicialização
    renderDescriptionSelect();
    renderDescriptionList();
    renderEmployeeSelect();
    renderEmployeeList();
});