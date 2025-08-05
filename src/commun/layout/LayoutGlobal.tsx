import { App, Flex, Layout } from 'antd';
import { mapActionCtrl } from 'commun/i18n/mapActionCtrl';
import { mapActionUI } from 'commun/i18n/mapActionUI';
import { mapErreur } from 'commun/i18n/mapErreur';
import { mapLibelle } from 'commun/i18n/mapLibelle';
import { mapMessage } from 'commun/i18n/mapMessage';
import { mapTitre } from 'commun/i18n/mapTitre';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import { DialogueErreur, MdlI18n, Sablier, selectInfoActionReussie, useAppDispatch, useI18n } from 'waxant';
import { LayoutContextProvider } from './LayoutContext';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';
import LayoutSidebar from './LayoutSidebar';
const LayoutGlobal = () => {
    const { infoActionI18n } = useI18n();
    const dispatch = useAppDispatch();

    const { notification } = App.useApp();
    const infoActionReussie = useSelector(selectInfoActionReussie);
    const { pathname } = useLocation();

    useEffect(() => {
        const sum = { ...mapTitre, ...mapLibelle, ...mapActionUI, ...mapActionCtrl };
        dispatch(MdlI18n.etendreLibelle(sum));
        dispatch(MdlI18n.etendreErreur(mapErreur));
        dispatch(MdlI18n.etendreInfoAction(mapMessage));
    }, []);

    useEffect(() => {
        const message = infoActionI18n(infoActionReussie);
        if (message) {
            notification.success({
                message,
                placement: 'topRight',
            });
        }
    }, [infoActionReussie]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <LayoutContextProvider>
            <Sablier>
                <div style={{ height: '100vh', overflowY: 'scroll' }}>
                    <Flex>
                        <Layout>
                            <LayoutSidebar />
                            <Layout style={{ overflowY: 'scroll' }}>
                                <LayoutHeader />
                                <Layout.Content>
                                    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ flex: 'auto' }}>
                                            <Outlet />
                                        </div>
                                        <div style={{ flex: 'none', textAlign: 'center' }}>
                                            <LayoutFooter />
                                        </div>
                                    </div>
                                </Layout.Content>
                            </Layout>
                        </Layout>
                    </Flex>
                </div>
            </Sablier>
            <DialogueErreur />
        </LayoutContextProvider>
    );
};

export default LayoutGlobal;
