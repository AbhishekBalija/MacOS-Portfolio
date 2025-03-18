 export const NodeService = {
    getTreeNodes() {
        return Promise.resolve([
            {
                key: '0',
                label: 'Portfolio',
                data: 'Portfolio Folder',
                icon: 'pi pi-fw pi-folder',
                children: [
                    {
                        key: '0-0',
                        label: 'About Me',
                        icon: 'pi pi-fw pi-user',
                        data: 'I am Abhishek AN, a recent Electronics and Communication graduate from the Maharaja Institute of Technology. I specialize in Full Stack Web Development.'
                    },
                    {
                        key: '0-1',
                        label: 'Skills',
                        icon: 'pi pi-fw pi-star',
                        children: [
                            {
                                key: '0-1-0',
                                label: 'Front End',
                                icon: 'pi pi-fw pi-desktop',
                                data: 'React (Vite), HTML, CSS, JavaScript, Tailwind CSS'
                            },
                            {
                                key: '0-1-1',
                                label: 'Back End',
                                icon: 'pi pi-fw pi-server',
                                data: 'Java (Spring Boot), Python (Django), Node.js (Express.js), RESTful APIs'
                            },
                            {
                                key: '0-1-2',
                                label: 'Database',
                                icon: 'pi pi-fw pi-database',
                                data: 'MySQL, MongoDB'
                            }
                        ]
                    },
                    {
                        key: '0-2',
                        label: 'Projects',
                        icon: 'pi pi-fw pi-folder',
                        children: [
                            {
                                key: '0-2-0',
                                label: 'Meal Mate',
                                icon: 'pi pi-fw pi-shopping-cart',
                                data: 'Food delivery web application using React, Django, and Razorpay'
                            },
                            {
                                key: '0-2-1',
                                label: 'Arogyam',
                                icon: 'pi pi-fw pi-heart',
                                data: 'Health appointment booking system using React, TypeScript, and Appwrite'
                            },
                            {
                                key: '0-2-2',
                                label: 'Sales Savvy',
                                icon: 'pi pi-fw pi-shopping-bag',
                                data: 'E-commerce solution using React Vite, Spring Boot, and MySQL'
                            }
                        ]
                    },
                    {
                        key: '0-3',
                        label: 'Contact',
                        icon: 'pi pi-fw pi-envelope',
                        children: [
                            {
                                key: '0-3-0',
                                label: 'Email',
                                icon: 'pi pi-fw pi-at',
                                data: 'abhishekan017@gmail.com'
                            },
                            {
                                key: '0-3-1',
                                label: 'Phone',
                                icon: 'pi pi-fw pi-phone',
                                data: '8762490952'
                            },
                            {
                                key: '0-3-2',
                                label: 'LinkedIn',
                                icon: 'pi pi-fw pi-linkedin',
                                data: 'linkedin.com/in/abhishek-a-n'
                            },
                            {
                                key: '0-3-3',
                                label: 'Portfolio',
                                icon: 'pi pi-fw pi-globe',
                                data: 'www.abhishekbalija.xyz'
                            },
                            {
                                key: '0-3-4',
                                label: 'Location',
                                icon: 'pi pi-fw pi-map-marker',
                                data: 'Hassan, 573103'
                            }
                        ]
                    }
                ]
            }
        ]);
    }
};
