const getMenuFrontEnd = (rol = 'USER_ROL') => {
    const menu = [{
            title: 'Principal',
            icon: 'mdi mdi-gauge',
            subMenu: [
                { title: 'Dashboard', url: '/' },
                { title: 'Progresbar', url: 'progress' },
                { title: 'Graficas', url: 'grafica1' },
                { title: 'Promesas', url: 'promess' },
                { title: 'rxjs', url: 'rxjs' }
            ]
        },
        {
            title: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            subMenu: [
                // { title: 'Usuarios', url: 'usuarios' },
                { title: 'Hospitales', url: 'hospitales' },
                { title: 'Medicos', url: 'medicos' },
            ]
        }

    ]

    if (rol === 'ADMIN_ROL') {
        menu[1].subMenu.unshift({ title: 'Usuarios', url: 'usuarios' })
    }


    return menu;
}

module.exports = {
    getMenuFrontEnd
}