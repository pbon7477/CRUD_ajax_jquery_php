
/* leer empleado */
$('#leerEmpleados').on('click', function(e){
    e.preventDefault();

    
    $.getJSON('http://localhost/ajax/015/empleados.php', { 'accion' : 'leer'} ,function(data){
        //console.log(data);
        
        let lista ='';
        $.each(data, function(index, item){
            lista +=`
            <li>Nombre:<b>
            ${item.nombre}</b> --Puesto: <b>${item.puesto}</b> --Edad: <b>${item.edad}</b>
                <button class='btnEditar btn btn-outline-light'
                data-id='${item.id}'                
                data-nombre='${item.nombre}'                
                data-puesto='${item.puesto}'                
                data-edad='${item.edad}'                
                
                >🛠</button>

                <button class='btnEliminar btn btn-outline-light'
                 data-id='${item.id}'
                 >🗑</button>
            </li>`;
        });

        $('#listaEmpleados').html(lista);
    });

});


/* crear empleado */

$('#crearEmpleado').on('click', function(e){
    e.preventDefault();

    let nombre = $('#nombre').val();
    let puesto = $('#puesto').val();
    let edad = $('#edad').val();

    $.post('http://localhost/ajax/015/empleados.php', 
    { 'accion':'insertar','nombre': nombre, 'puesto' : puesto, 'edad': edad},
     function(data){ 
        //data = data.trim(); 
        console.log(data);     

        if(data==='1'){
            $('#nombre').val('');
            $('#puesto').val('');
            $('#edad').val('');
            $('#lista-tab').click();
            $('#leerEmpleados').click();
        }
    });

    
});


//accion de los botones con ID='btnEditar' que genera el bucle

$(document).on('click','.btnEditar' ,function(){
    //console.log($(this).data('id'));

    $('#crearEmpleado').addClass('d-none');
    $('#editarEmpleado').removeClass('d-none');
    $('#crear-tab').html('Editar empleado');
    $('#crear-tab').click();

    $('#id').val( $(this).data('id') );
    $('#nombre').val( $(this).data('nombre') );
    $('#puesto').val( $(this).data('puesto') );
    $('#edad').val( $(this).data('edad') );
    
});


//boton editar empleado del formulario editar

$('#editarEmpleado').on('click', function(e){
    e.preventDefault();

    let id = $('#id').val();
    let nombre = $('#nombre').val();
    let puesto = $('#puesto').val();
    let edad = $('#edad').val();

      $.post('http://localhost/ajax/015/empleados.php', 
            { 'accion':'editar', 'id': id, 'nombre' : nombre, 'puesto':puesto, 'edad': edad },
            function(data){
                if(data == '1'){                    
                    console.log(data);
                    $('#lista-tab').click();
                    $('#leerEmpleados').click();
                    //alert('Actualizacion realizada exitosamente.');
                }
            }
        );

                     
        vaciarCampos();
        $('#crear-tab').html('Crear');  
        $('#editarEmpleado').addClass('d-none');
        $('#crearEmpleado').removeClass('d-none');

  

} );


//boton eliminar

$(document).on('click','.btnEliminar', function(){
    let id = $(this).data('id');

    let linea = $(this).parent();
    
    $.post('http://localhost/ajax/015/empleados.php',
        {'accion':'eliminar', 'id':id}, 
        function(data){
            console.log(data); 
           // $('#leerEmpleados').click();  
           linea.remove();       
        }
     );
});


//en caso de que al estar editando quier volver a la lista, que el formulario vuelva a su estado original
$('#lista-tab').on('click', function(e){
    
    $('#crear-tab').html('Crear')
    vaciarCampos();
    $('#editarEmpleado').addClass('d-none');
    $('#crearEmpleado').removeClass('d-none');
});



function vaciarCampos(){
    $('#nombre').val('');
    $('#puesto').val('');
    $('#edad').val('');
}