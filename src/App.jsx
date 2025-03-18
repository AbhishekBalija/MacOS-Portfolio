import React, { useRef, useState, useEffect } from 'react';
import { Dock } from 'primereact/dock';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import { Galleria } from 'primereact/galleria';
import { Toast } from 'primereact/toast';
import { Tree } from 'primereact/tree';
import { Menubar } from 'primereact/menubar';
import { NodeService } from './service/NodeService';
import { PhotoService } from './service/PhotoService';
import './DockDemo.css';

// Change the component name from AdvanceDemo to App
const App = () => {
    const [displayTerminal, setDisplayTerminal] = useState(false);
    const [displayFinder, setDisplayFinder] = useState(false);
    const [displayGalleria, setDisplayGalleria] = useState(false);
    const [images, setImages] = useState(null);
    const [nodes, setNodes] = useState(null);
    const [expandedKeys, setExpandedKeys] = useState({'0': true});
    const [appendTo, setAppendTo] = useState(null);
    const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
    const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
    const toast = useRef(null);
    const toast2 = useRef(null);
    const galleria = useRef(null);
    const [selectedSection, setSelectedSection] = useState('portfolio');
    const [isGalleriaMaximized, setIsGalleriaMaximized] = useState(false);
    const [displaySafari, setDisplaySafari] = useState(false);
    const [safariUrl, setSafariUrl] = useState('https://github.com/abhishekbalija');
    const [isSafariMaximized, setIsSafariMaximized] = useState(false);

    const thumbnailTemplate = (item) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '4px' }} />;
    };

    const nodeTemplate = (node) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{node.label}</span>
                {node.data && <span style={{ fontSize: '0.875rem', color: '#666' }}>{node.data}</span>}
            </div>
        );
    };

    // Fix the dockItems array - Safari and GitHub items
    const dockItems = [
        {
            label: 'Finder',
            icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/finder.svg" width="100%" />,
            command: () => {
                setDisplayFinder(true);
            }
        },
        {
            label: 'Terminal',
            icon: () => <img alt="Finder" src="https://primefaces.org/cdn/primereact/images/dock/terminal.svg" width="100%" />,
            command: () => {
                setDisplayTerminal(true);
            }
        },
        {
            label: 'App Store',
            icon: () => <img alt="App Store" src="https://primefaces.org/cdn/primereact/images/dock/appstore.svg" width="100%" />,
            command: () => {
                toast2.current.show({ severity: 'info', summary: 'Coming Soon!', detail: 'This feature is under development.' });
            }
        },
        {
            label: 'Safari',
            icon: () => <img alt="Safari" src="https://primefaces.org/cdn/primereact/images/dock/safari.svg" width="100%" />,
            command: () => {
                setSafariUrl('https://www.google.com/search?q=abhishek+balija&sourceid=chrome&ie=UTF-8');
                setDisplaySafari(true);
            }
        },
        {
            label: 'Photos',
            icon: () => <img alt="Photos" src="https://primefaces.org/cdn/primereact/images/dock/photos.svg" width="100%" />,
            command: () => {
                setDisplayGalleria(true);
            }
        },
        {
            label: 'GitHub',
            icon: () => <img alt="GitHub" src="https://primefaces.org/cdn/primereact/images/dock/github.svg" width="100%" />,
            command: () => {
                setSafariUrl('https://github.com/abhishekbalija');
                setDisplaySafari(true);
            }
        },
        {
            label: 'Trash',
            icon: () => <img alt="trash" src="https://primefaces.org/cdn/primereact/images/dock/trash.png" width="100%" />,
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Empty Trash' });
            }
        }
    ];

    const menubarItems = [
        {
            label: 'Finder',
            className: 'menubar-root'
        },
        {
            label: 'File'
        },
        {
            label: 'Edit'
        },
        {
            label: 'View'
        },
        {
            label: 'Go'
        },
        {
            label: 'Window'
        },
        {
            label: 'Help'
        }
    ];

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    };

    const commandHandler = (text) => {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
    
        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;
    
            case 'greet':
                response = 'Hello! I am Abhishek AN. Welcome to my portfolio.';
                break;
    
            case 'about':
                response = '• Full Stack Web Developer\n• Electronics & Communication graduate\n• Passionate about building responsive web applications';
                break;
    
            case 'skills':
                response = '• Frontend: React, HTML, CSS, JavaScript\n• Backend: Java, Python, Node.js\n• Database: MySQL, MongoDB';
                break;
    
            case 'projects':
                response = '• Meal Mate: Food delivery app\n• Arogyam: Health booking system\n• Sales Savvy: E-commerce solution\n\nType "project <name>" for details.';
                break;
    
            case 'project':
                const projectName = text.substring(argsIndex + 1).toLowerCase();
                if (projectName === 'meal mate') {
                    response = '📱 Meal Mate\n• Food delivery web app\n• React, Django, Razorpay\n• Features: Role-based access, ordering system';
                } else if (projectName === 'arogyam') {
                    response = '🏥 Arogyam\n• Health appointment booking\n• React, TypeScript, Appwrite\n• Features: Twilio integration, notifications';
                } else if (projectName === 'sales savvy') {
                    response = '🛒 Sales Savvy\n• E-commerce platform\n• React Vite, Spring Boot, MySQL\n• Features: Admin panel, order tracking';
                } else {
                    response = 'Project not found. Try "meal mate", "arogyam", or "sales savvy".';
                }
                break;
    
            case 'contact':
                response = '📧 abhishekan017@gmail.com\n📱 8762490952\n🔗 linkedin.com/in/abhishek-a-n\n🌐 www.abhishekbalija.xyz';
                break;
    
            case 'help':
                response = 'Commands:\n• about - Professional summary\n• skills - Technical skills\n• projects - Project list\n• project <name> - Project details\n• contact - Contact info\n• clear - Clear terminal';
                break;
    
            case 'clear':
                response = null;
                break;
    
            default:
                response = 'Command not found. Type "help" for available commands.';
                break;
        }
    
        if (response) {
            TerminalService.emit('response', response);
        } else {
            TerminalService.emit('clear');
        }
    };

    useEffect(() => {
        TerminalService.on('command', commandHandler);
        PhotoService.getImages().then((data) => setImages(data));
        NodeService.getTreeNodes().then((data) => setNodes(data));

        setAppendTo('self');

        return () => {
            TerminalService.off('command', commandHandler);

            // reset
            setAppendTo(null);
        };
    }, []);

    const start = <i className="pi pi-apple"></i>;
    const end = (
        <React.Fragment>
            <i className="pi pi-video" />
            <i className="pi pi-wifi" />
            <i className="pi pi-volume-up" />
            <span>{new Date().toLocaleString('en-US', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            <i className="pi pi-search" />
            <i className="pi pi-bars" />
        </React.Fragment>
    );

    return (
        <div className="card dock-demo">
            <Tooltip className="dark-tooltip" target=".dock-advanced .p-dock-action" my="center+15 bottom-15" at="center top" showDelay={150} />
            <Menubar model={menubarItems} start={start} end={end} />
            <div className="dock-window dock-advanced">
                <Toast ref={toast} />
                <Toast ref={toast2} position="top-center" />
                <Dock model={dockItems} position="bottom" className="custom-dock" />
                <Dialog 
                    visible={displayTerminal && !isTerminalMinimized} 
                    breakpoints={{ '960px': '75vw', '600px': '90vw' }} 
                    style={isTerminalMaximized ? { width: '100vw', height: '90vh' } : { width: '50vw' }} 
                    onHide={() => setDisplayTerminal(false)} 
                    maximizable={false}
                    blockScroll={false}
                    className={`terminal-dialog ${isTerminalMaximized ? 'maximized' : ''}`}
                    showHeader={false}
                >
                    <div className="terminal-header">
                        <div className="window-controls">
                            <span className="close" onClick={() => setDisplayTerminal(false)}></span>
                            <span className="minimize" onClick={() => setIsTerminalMinimized(true)}></span>
                            <span className="maximize" onClick={() => setIsTerminalMaximized(!isTerminalMaximized)}></span>
                        </div>
                        <div className="terminal-title">Terminal</div>
                    </div>
                    <Terminal 
                        welcomeMessage="Welcome to Abhishek's Terminal! Type 'help' for commands." 
                        prompt="abhishek $ " 
                        className="custom-terminal"
                    />
                </Dialog>
                <Dialog 
                    visible={displayFinder} 
                    style={{ width: '80vw', height: '70vh' }} 
                    onHide={() => setDisplayFinder(false)} 
                    maximizable 
                    className="finder-dialog"
                    showHeader={false}
                    blockScroll={false}
                >
                    <div className="finder-header">
                        <div className="window-controls">
                            <span className="close" onClick={() => setDisplayFinder(false)}></span>
                            <span className="minimize"></span>
                            <span className="maximize"></span>
                        </div>
                        <div className="finder-title">Finder</div>
                    </div>
                    <div className="finder-toolbar">
                        <div className="finder-toolbar-buttons">
                            <button className="toolbar-button"><i className="pi pi-arrow-left"></i></button>
                            <button className="toolbar-button"><i className="pi pi-arrow-right"></i></button>
                            <button className="toolbar-button"><i className="pi pi-list"></i></button>
                            <button className="toolbar-button"><i className="pi pi-th-large"></i></button>
                        </div>
                        <div className="finder-view-options">
                            <button className="view-option active"><i className="pi pi-list"></i></button>
                            <button className="view-option"><i className="pi pi-th-large"></i></button>
                        </div>
                    </div>
                    <div className="finder-container">
                        <div className="finder-sidebar">
                            <div className="sidebar-section">
                                <h3>Favorites</h3>
                                <div 
                                    className={`sidebar-item ${selectedSection === 'portfolio' ? 'active' : ''}`}
                                    onClick={() => setSelectedSection('portfolio')}
                                >
                                    <i className="pi pi-home"></i>
                                    <span>Portfolio</span>
                                </div>
                                <div 
                                    className={`sidebar-item ${selectedSection === 'about' ? 'active' : ''}`}
                                    onClick={() => setSelectedSection('about')}
                                >
                                    <i className="pi pi-user"></i>
                                    <span>About Me</span>
                                </div>
                            </div>
                            <div className="sidebar-section">
                                <h3>Categories</h3>
                                <div 
                                    className={`sidebar-item ${selectedSection === 'skills' ? 'active' : ''}`}
                                    onClick={() => setSelectedSection('skills')}
                                >
                                    <i className="pi pi-star"></i>
                                    <span>Skills</span>
                                </div>
                                <div 
                                    className={`sidebar-item ${selectedSection === 'projects' ? 'active' : ''}`}
                                    onClick={() => setSelectedSection('projects')}
                                >
                                    <i className="pi pi-briefcase"></i>
                                    <span>Projects</span>
                                </div>
                                <div 
                                    className={`sidebar-item ${selectedSection === 'contact' ? 'active' : ''}`}
                                    onClick={() => setSelectedSection('contact')}
                                >
                                    <i className="pi pi-envelope"></i>
                                    <span>Contact</span>
                                </div>
                            </div>
                        </div>
                        <div className="finder-content">
                            <div className="finder-path-bar">
                                <span>Abhishek</span>
                                <i className="pi pi-chevron-right"></i>
                                <span>{selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</span>
                            </div>
                            {/* Content sections remain the same */}
                            {selectedSection === 'portfolio' && (
                                <div className="content-section">
                                    <h2>My Portfolio</h2>
                                    <p>Welcome to my portfolio! I'm Abhishek AN, a Full Stack Web Developer.</p>
                                    <p>Use the sidebar to navigate through different sections.</p>
                                </div>
                            )}
                            {selectedSection === 'about' && (
                                <div className="content-section">
                                    <h2>About Me</h2>
                                    <p>I am Abhishek AN, a recent Electronics and Communication graduate from the Maharaja Institute of Technology.</p>
                                    <p>I specialize in Full Stack Web Development, building responsive and user-friendly websites.</p>
                                    <p>I have experience in both front-end and back-end development and stay updated with industry trends.</p>
                                </div>
                            )}
                            {selectedSection === 'skills' && (
                                <div className="content-section">
                                    <h2>Technical Skills</h2>
                                    <div className="skill-category">
                                        <h3>Front End</h3>
                                        <p>React (Vite), HTML, CSS, JavaScript, Tailwind CSS</p>
                                    </div>
                                    <div className="skill-category">
                                        <h3>Back End</h3>
                                        <p>Java (Spring Boot), Python (Django), Node.js (Express.js), RESTful APIs</p>
                                    </div>
                                    <div className="skill-category">
                                        <h3>Database</h3>
                                        <p>MySQL, MongoDB</p>
                                    </div>
                                </div>
                            )}
                            {selectedSection === 'projects' && (
                                <div className="content-section">
                                    <h2>Projects</h2>
                                    <div className="project-item">
                                        <h3>Meal Mate</h3>
                                        <p>Food delivery web application (React, Django, Razorpay)</p>
                                        <p>Features: Role-based access, ordering system, Razorpay integration</p>
                                    </div>
                                    <div className="project-item">
                                        <h3>Arogyam</h3>
                                        <p>Health appointment booking system (React, TypeScript, Appwrite)</p>
                                        <p>Features: Twilio API integration, automated notifications</p>
                                    </div>
                                    <div className="project-item">
                                        <h3>Sales Savvy</h3>
                                        <p>E-commerce solution (React Vite, Spring Boot, MySQL)</p>
                                        <p>Features: Admin panel, customer interface, order tracking</p>
                                    </div>
                                </div>
                            )}
                            {selectedSection === 'contact' && (
                                <div className="content-section">
                                    <h2>Contact Information</h2>
                                    <p><strong>Email:</strong> abhishekan017@gmail.com</p>
                                    <p><strong>Phone:</strong> 8762490952</p>
                                    <p><strong>LinkedIn:</strong> linkedin.com/in/abhishek-a-n</p>
                                    <p><strong>Portfolio:</strong> www.abhishekbalija.xyz</p>
                                    <p><strong>Location:</strong> Hassan, 573103</p>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog>
                <Galleria ref={galleria} value={images} responsiveOptions={responsiveOptions} numVisible={2} style={{ width: '400px' }}
                    circular fullScreen showThumbnails={false} showItemNavigators item={itemTemplate} />

                <Dialog 
                    visible={displayGalleria} 
                    style={isGalleriaMaximized ? { width: '100vw', height: '90vh' } : { width: '70vw', height: '80vh' }} 
                    onHide={() => setDisplayGalleria(false)} 
                    className={`photos-dialog ${isGalleriaMaximized ? 'maximized' : ''}`}
                    showHeader={false}
                    modal
                    blockScroll={false}
                >
                    <div className="photos-header">
                        <div className="window-controls">
                            <span className="close" onClick={() => setDisplayGalleria(false)}></span>
                            <span className="minimize" onClick={() => setDisplayGalleria(false)}></span>
                            <span className="maximize" onClick={() => setIsGalleriaMaximized(!isGalleriaMaximized)}></span>
                        </div>
                        <div className="photos-title">Photos</div>
                    </div>
                    <Galleria 
                        value={images} 
                        responsiveOptions={responsiveOptions} 
                        numVisible={5}
                        circular 
                        showThumbnails={true}
                        showItemNavigators 
                        item={itemTemplate}
                        thumbnail={thumbnailTemplate}
                        className="mac-galleria"
                    />
                </Dialog>
                
                <Dialog 
                    visible={displaySafari} 
                    style={isSafariMaximized ? { width: '100vw', height: '90vh' } : { width: '80vw', height: '80vh' }} 
                    onHide={() => setDisplaySafari(false)} 
                    className={`safari-dialog ${isSafariMaximized ? 'maximized' : ''}`}
                    showHeader={false}
                    modal
                    blockScroll={false}
                >
                    <div className="safari-header">
                        <div className="window-controls">
                            <span className="close" onClick={() => setDisplaySafari(false)}></span>
                            <span className="minimize" onClick={() => setDisplaySafari(false)}></span>
                            <span className="maximize" onClick={() => setIsSafariMaximized(!isSafariMaximized)}></span>
                        </div>
                        <div className="safari-toolbar">
                            <div className="browser-controls">
                                <span className="browser-button"><i className="pi pi-arrow-left"></i></span>
                                <span className="browser-button"><i className="pi pi-arrow-right"></i></span>
                                <span className="browser-button"><i className="pi pi-refresh"></i></span>
                            </div>
                            <div className="address-bar">
                                <i className="pi pi-lock"></i>
                                <span>{safariUrl}</span>
                            </div>
                            <div className="browser-actions">
                                <span className="browser-button"><i className="pi pi-share-alt"></i></span>
                                <span className="browser-button"><i className="pi pi-plus"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="safari-content">
                        {safariUrl.includes('github.com') ? (
                           <div className="github-profile">
                           <div className="github-header">
                               <div className="github-avatar">
                                   <img src="https://avatars.githubusercontent.com/u/107603928?v=4" alt="GitHub Avatar" />
                               </div>
                               <div className="github-info">
                                   <h2>Abhishek AN</h2>
                                   <p className="github-username">@abhishekbalija</p>
                                   <p className="github-bio">Full Stack Web Developer | React | Spring Boot | Django</p>
                                   <div className="github-stats">
                                       <div className="stat-item">
                                           <i className="pi pi-users"></i>
                                           <span>Followers: 42</span>
                                       </div>
                                       <div className="stat-item">
                                           <i className="pi pi-star"></i>
                                           <span>Repositories: 15</span>
                                       </div>
                                       <div className="stat-item">
                                           <i className="pi pi-code"></i>
                                           <span>Contributions: 328</span>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           {/* Rest of GitHub content */}
                           <div className="github-tabs">
                               <div className="tab active">Repositories</div>
                               <div className="tab">Projects</div>
                               <div className="tab">Stars</div>
                           </div>
                           <div className="github-repositories">
    <div className="repo-item">
        <div className="repo-header">
            <h3>meal-mate</h3>
            <span className="repo-visibility">Public</span>
        </div>
        <p className="repo-description">Food delivery web application built with React, Django and Razorpay integration</p>
        <div className="repo-meta">
            <span className="repo-language"><span className="language-color js"></span>JavaScript</span>
            <span className="repo-stars"><i className="pi pi-star-fill"></i> 12</span>
            <span className="repo-forks"><i className="pi pi-share-alt"></i> 5</span>
            <span className="repo-updated">Updated 2 weeks ago</span>
        </div>
    </div>
    <div className="repo-item">
        <div className="repo-header">
            <h3>arogyam</h3>
            <span className="repo-visibility">Public</span>
        </div>
        <p className="repo-description">Health appointment booking system with Twilio API integration for notifications</p>
        <div className="repo-meta">
            <span className="repo-language"><span className="language-color ts"></span>TypeScript</span>
            <span className="repo-stars"><i className="pi pi-star-fill"></i> 8</span>
            <span className="repo-forks"><i className="pi pi-share-alt"></i> 3</span>
            <span className="repo-updated">Updated 1 month ago</span>
        </div>
    </div>
    <div className="repo-item">
        <div className="repo-header">
            <h3>sales-savvy</h3>
            <span className="repo-visibility">Public</span>
        </div>
        <p className="repo-description">E-commerce solution with admin panel and order tracking functionality</p>
        <div className="repo-meta">
            <span className="repo-language"><span className="language-color java"></span>Java</span>
            <span className="repo-stars"><i className="pi pi-star-fill"></i> 15</span>
            <span className="repo-forks"><i className="pi pi-share-alt"></i> 7</span>
            <span className="repo-updated">Updated 3 weeks ago</span>
        </div>
    </div>
    <div className="repo-item">
        <div className="repo-header">
            <h3>macos-portfolio</h3>
            <span className="repo-visibility">Public</span>
        </div>
        <p className="repo-description">Interactive MacOS-themed portfolio website built with React and PrimeReact</p>
        <div className="repo-meta">
            <span className="repo-language"><span className="language-color js"></span>JavaScript</span>
            <span className="repo-stars"><i className="pi pi-star-fill"></i> 21</span>
            <span className="repo-forks"><i className="pi pi-share-alt"></i> 9</span>
            <span className="repo-updated">Updated 3 days ago</span>
        </div>
    </div>
    <div className="repo-item">
        <div className="repo-header">
            <h3>circuit-simulator</h3>
            <span className="repo-visibility">Public</span>
        </div>
        <p className="repo-description">Interactive circuit building and simulation tool (IEEE competition winner)</p>
        <div className="repo-meta">
            <span className="repo-language"><span className="language-color py"></span>Python</span>
            <span className="repo-stars"><i className="pi pi-star-fill"></i> 7</span>
            <span className="repo-forks"><i className="pi pi-share-alt"></i> 2</span>
            <span className="repo-updated">Updated 2 months ago</span>
        </div>
    </div>
    <div className="repo-item">
        <div className="repo-header">
            <h3>spring-boot-starter</h3>
            <span className="repo-visibility">Public</span>
        </div>
        <p className="repo-description">Comprehensive Spring Boot starter template with security and JWT authentication</p>
        <div className="repo-meta">
            <span className="repo-language"><span className="language-color java"></span>Java</span>
            <span className="repo-stars"><i className="pi pi-star-fill"></i> 11</span>
            <span className="repo-forks"><i className="pi pi-share-alt"></i> 6</span>
            <span className="repo-updated">Updated 1 month ago</span>
        </div>
    </div>
</div>
                       </div>
                        ) : (
                            <div className="google-search-results">
                                <div className="google-search-header">
                                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png" alt="Google" className="google-search-logo" />
                                    <div className="google-search-bar">
                                        <i className="pi pi-search"></i>
                                        <input type="text" value="abhishek balija" readOnly />
                                        <i className="pi pi-times"></i>
                                        <i className="pi pi-microphone"></i>
                                    </div>
                                </div>
                                
                                <div className="google-search-nav">
                                    <div className="google-search-nav-item active">All</div>
                                    <div className="google-search-nav-item">Images</div>
                                    <div className="google-search-nav-item">Videos</div>
                                    <div className="google-search-nav-item">News</div>
                                    <div className="google-search-nav-item">Shopping</div>
                                    <div className="google-search-nav-item">More</div>
                                </div>
                                
                                <div className="search-result-stats">
                                    About 12,300 results (0.48 seconds)
                                </div>
                                
                                <div className="search-result">
                                    <div className="search-result-url">
                                        <img src="/src/assets/favicon.ico" alt="favicon" />
                                        https://www.abhishekbalija.xyz
                                    </div>
                                    <a href="https://www.abhishekbalija.xyz" target="_blank" className="search-result-title">Abhishek Balija</a>
                                    <div className="search-result-description">
                                        Abhishek Balija, Creative Web Developer. Abhishek Balija / © 2023 Abhishek Balija. About /; Projects /; Blog
                                    </div>
                                </div>
                                
                                <div className="search-result">
                                    <div className="search-result-url">
                                        <img src="https://www.linkedin.com/favicon.ico" alt="favicon" />
                                        https://www.linkedin.com › abhishek.balija
                                    </div>
                                    <a href="https://www.linkedin.com/in/abhishek-balija-551701221/" target="_blank" className="search-result-title">Abhishek Balija - Bengaluru, Karnataka, India</a>
                                    <div className="search-result-description">
                                        Education: MITT College, Nanjungud Road, Mysuru · Location: 570023. View Abhishek Balija's profile on LinkedIn, a professional community of 1 billion members ...
                                    </div>
                                </div>
                                
                                <div className="search-result">
                                    <div className="search-result-url">
                                        <img src="/src/assets/favicon.ico" alt="favicon" />
                                        https://www.abhishekbalija.xyz › about
                                    </div>
                                    <a href="https://www.abhishekbalija.xyz/about" target="_blank" className="search-result-title">About Abhishek Balija</a>
                                    <div className="search-result-description">
                                        I'm Abhishek AN, a recent Electronics and Communication graduate from the Maharaja Institute of Technology. I specialize in Full Stack Web Development, ...
                                    </div>
                                </div>
                                
                                <div className="search-result">
                                    <div className="search-result-url">
                                        <img src="https://avatars.githubusercontent.com/u/107603928?v=4" alt="favicon" />
                                        https://github.com › abhishekbalija
                                    </div>
                                    <a href="https://github.com/abhishekbalija" target="_blank" className="search-result-title">Abhishek Balija (@abhishekbalija) · GitHub</a>
                                    <div className="search-result-description">
                                        Abhishek Balija has 45 repositories available. Follow their code on GitHub. Full Stack Web Developer specializing in React, Spring Boot, and Django.
                                    </div>
                                </div>
                                
                                <div className="search-result">
                                    <div className="search-result-url">
                                        <img src="https://www.facebook.com/favicon.ico" alt="favicon" />
                                        https://www.facebook.com › balija.abhishek
                                    </div>
                                    <a href="https://www.facebook.com/profile.php?id=100014035036451" className="search-result-title">Abhishek</a>
                                    <div className="search-result-description">
                                        Abhishek Balija is on Facebook. Join Facebook to connect with Abhishek Balija and others you may know. Facebook gives people the power to share and makes...
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog>

                {isTerminalMinimized && (
                    <div className="minimized-app" onClick={() => setIsTerminalMinimized(false)}>
                        <i className="pi pi-terminal"></i>
                        <span>Terminal</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
        